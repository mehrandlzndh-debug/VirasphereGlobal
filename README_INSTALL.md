# VirasphereGlobal - راهنمای نصب و اجرا

این مخزن شامل ساختار اولیهٔ پروژه «VirasphereGlobal» برای راه‌اندازی داشبورد مالک و داشبوردهای وابسته (نزدیکان/تیم) با استک پیشنهادی hybrid (Next.js + NestJS + FastAPI) است.

این راهنما مراحل سریع راه‌اندازی محلی با Docker را پوشش می‌دهد و نکات لازم برای فعال‌سازی سرویس‌های خارجی (SMS, Email, Payments, AI) را ارائه می‌دهد.

پیش‌نیازها
- Docker و docker-compose نصب شده
- Node.js (برای توسعه محلی frontend/backend)
- Python (برای سرویس AI در صورت نیاز)

مرحلهٔ سریع (محلی)
1. کلون مخزن و جابجایی به شاخهٔ setup/initial-dashboard
   git clone https://github.com/mehrandlzndh-debug/VirasphereGlobal.git
   cd VirasphereGlobal
   git checkout setup/initial-dashboard

2. کپی فایل env نمونه و تنظیم مقادیر
   cp .env.example .env
   (مقادیر DB, JWT و providerها را پر کنید یا از مقدار placeholder استفاده کنید)

3. اجرای سرویس‌ها
   docker-compose up --build

4. دسترسی
- Frontend (owner): http://localhost:3000
- API: http://localhost:8000
- Worker: در لاگ‌های docker قابل مشاهده است

فایل‌های مهم در این شاخه
- docker-compose.yml
- .env.example
- docs/ARCHITECTURE.md
- docs/PAYMENT_FLOW.md
- examples/ (نمونهٔ اسکریپت‌های اتصال به provider)
- supervisor/ (stub لایهٔ ناظر)

نکات مهم
- این نسخه یک PoC و نمونهٔ اولیه است؛ برای تولید نیاز به جایگزینی placeholderها، تنظیم secretها در Vault و پیکربندی providerهاست.
- برای فعال‌سازی WebAuthn (اثر انگشت) باید دستگاه شما کلید ثبت‌شده داشته باشد؛ دستورالعمل در supervisor/WEBAUTHN.md آمده است.

