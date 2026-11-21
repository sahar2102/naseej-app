// Pipeline Jenkins du projet Naseej
// Declenche automatiquement par GitHub (verification du depot toutes les 2 minutes),
// il recupere le code, construit une image Docker par microservice, deploie sur Minikube
// puis verifie que les services deployes repondent (tests de sante).
pipeline {
    agent any

    options {
        timestamps()                        // horodatage de chaque ligne du journal
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    triggers {
        pollSCM('H/2 * * * *')              // interroge GitHub toutes les 2 minutes
    }

    environment {
        TAG = "${env.BUILD_NUMBER}"         // chaque image est etiquetee avec le numero du build
        KUBECTL = "docker exec minikube /var/lib/minikube/binaries/v1.37.0/kubectl --kubeconfig=/etc/kubernetes/admin.conf -n naseej"
    }

    stages {
        stage('Checkout GitHub') {
            steps {
                checkout scm                // clone la branche main du depot GitHub
                sh 'git log -1 --pretty=format:"Commit %h par %an : %s"'
            }
        }
        stage('Build auth-service') {
            steps {
                sh 'docker build -t naseej-auth:${TAG} backend/auth-service'
            }
        }
        stage('Build emergency-service') {
            steps {
                sh 'docker build -t naseej-emergency:${TAG} backend/emergency-service'
            }
        }
        stage('Build api-gateway') {
            steps {
                sh 'docker build -t naseej-gateway:${TAG} backend/api-gateway'
            }
        }
        stage('Build frontend') {
            steps {
                sh 'docker build -t naseej-frontend:${TAG} frontend'
            }
        }
        stage('Verification des images') {
            steps {
                sh 'docker images --format "{{.Repository}}:{{.Tag}}  {{.Size}}" | grep -E "^naseej-[a-z]+:${TAG} "'
            }
        }
        stage('Deploiement sur Minikube') {
            steps {
                // 1. copie des images du build dans les deux noeuds du cluster
                sh '''
                    for node in minikube minikube-m02; do
                      for img in naseej-auth naseej-emergency naseej-gateway naseej-frontend; do
                        docker save ${img}:${TAG} | docker exec -i ${node} ctr -n k8s.io images import - > /dev/null
                        echo "image ${img}:${TAG} chargee sur ${node}"
                      done
                    done
                '''
                // 2. mise a jour progressive (rolling update) des Deployments
                sh '''
                    # k : relance kubectl jusqu'a 6 fois si l'API Kubernetes ne repond pas encore
                    k() { for i in 1 2 3 4 5 6; do ${KUBECTL} "$@" && return 0; echo "API Kubernetes indisponible, nouvel essai dans 10 s"; sleep 10; done; return 1; }
                    k get deployments
                    k set image deployment/auth-service auth-service=naseej-auth:${TAG}
                    k set image deployment/emergency-service emergency-service=naseej-emergency:${TAG}
                    k set image deployment/api-gateway api-gateway=naseej-gateway:${TAG}
                    k set image deployment/web-frontend web-frontend=naseej-frontend:${TAG}
                    for d in auth-service emergency-service api-gateway web-frontend; do
                      k rollout status deployment/${d} --timeout=240s
                    done
                    k get pods -o wide
                '''
            }
        }
        stage('Tests de sante') {
            steps {
                // la chaine frontend -> api-gateway -> backends doit repondre "ready"
                sh '''
                    k() { for i in 1 2 3 4 5 6; do ${KUBECTL} "$@" && return 0; sleep 10; done; return 1; }
                    k exec deploy/web-frontend -- wget -qO- http://api-gateway:8080/ready; echo
                    k exec deploy/api-gateway -- wget -qO- http://auth-service:3000/ready; echo
                    k exec deploy/api-gateway -- wget -qO- http://emergency-service:3000/ready; echo
                '''
            }
        }
    }

    post {
        success { echo "Build ${TAG} reussi : 4 images construites depuis GitHub et deployees sur Minikube." }
        failure { echo "Build ${TAG} en echec : consulter le journal de l'etape en rouge." }
    }
}
