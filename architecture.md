# Architecture Overview - Naseej V2

## 1. System Design
- **Frontend**: React + Tailwind CSS + Framer Motion (for smooth floating UI).
- **Map**: Leaflet.js with custom light/dark tiles (CartoDB Positron/Dark Matter).
- **Backend**: NestJS (Microservices).
- **Real-time**: Socket.io for bus tracking.

## 2. API Gateway Logic
- All requests flow through the Gateway.
- JWT verification is done at the edge.
- Services are hidden in a private network (Kubernetes ClusterIP).

## 3. Data Flow
- User drops a pin -> Browser Geolocation or Click.
- Ambulance Request -> Emergency Service -> RabbitMQ -> Auth Service (to find nearest provider phone).
- Bus GPS -> IoT Simulator -> Transport Service -> Redis -> WebSocket -> Student Browser.
