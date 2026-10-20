# نسيج - Naseej Platform (Tunisia)

منصة رقمية موحدة لخدمات الطوارئ وتتبع النقل العام التونسي.  
A modern microservices-based emergency response and public transit tracking platform for Tunisia.

---

## 🚀 كيفية تشغيل واختبار التطبيق (How to Test & Run)

### الخيار 1: الاختبار السحابي عبر GitHub Codespaces (موصى به عند وجود EVE-NG)
> 💡 **لماذا هذا الخيار؟** إذا كنت تستخدم **EVE-NG** أو برامج المحاكاة الافتراضية على حاسوبك، فإن تشغيل Docker محلياً قد يعطّل خاصية VT-x/AMD-V (بسبب Hyper-V / WSL2). يتيح لك GitHub Codespaces تشغيل بيئة Docker كاملة في سحابة GitHub مجاناً وبدون التأثير على حاسوبك إطلاقاً.

1. افتح صفحة المستودع على GitHub:  
   👉 [https://github.com/sahar2102/naseej-project](https://github.com/sahar2102/naseej-project)
2. اضغط على الزر الأخضر **`Code`** ثم اختر تبويب **`Codespaces`**.
3. اضغط على **`Create codespace on main`**.
4. عند فتح الـ Codespace في المتصفح، افتح الطرفية (Terminal) وشغّل:
   ```bash
   docker compose up --build
   ```
5. سيتعرف Codespace تلقائياً على المنافذ ويعرض لك نافذة منبثقة لفتح الواجهة:
   - **Frontend (Web UI)**: المنفذ `5173`
   - **Auth Service**: المنفذ `3001`
   - **Emergency Service**: المنفذ `3002`
   - **Transport Service**: المنفذ `3003`

---

### الخيار 2: الاختبار المحلي بدون Docker (آمن 100% مع EVE-NG)
يمكنك معاينة واجهة المستخدم واختبارها محلياً على جهازك مباشرة باستخدام Node.js بدون تشغيل Docker:

```powershell
# 1. الدخول إلى مجلد الواجهة
cd frontend

# 2. تشغيل سيرفر التطوير
npm run dev
```
افتح المتصفح على: **`http://localhost:5173`**

---

## 🏗 بنية المشروع (Microservices Architecture)

| الخدمة | التقنية | المنفذ | الوصف |
| :--- | :--- | :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion | `5173` | واجهة المستخدم التفاعلية (خريطة، استغاثة، حافلات) |
| **Auth Service** | NestJS, TypeORM, PostgreSQL, JWT | `3001` | تسجيل الدخول والمصادقة وإدارة المستخدمين |
| **Emergency Service**| NestJS, TypeORM, PostGIS (PostgreSQL) | `3002` | توزيع وإيجاد أقرب سيارات الإسعاف والمتطوعين |
| **Transport Service**| NestJS, Socket.io, Redis | `3003` | تتبع حافلات النقل الحضري لحظياً عبر WebSockets |
| **Redis** | Redis Alpine | `6379` | الذاكرة المؤقتة ورسائل النقل الفورية |

---

## 🛠 البناء اليدوي لكل خدمة (Manual Build & Verification)

```bash
# بناء الواجهة الأمامية
cd frontend && npm run build

# بناء خدمة المصادقة
cd backend/auth-service && npm run build

# بناء خدمة الطوارئ
cd backend/emergency-service && npm run build

# بناء خدمة النقل
cd backend/transport-service && npm run build
```
