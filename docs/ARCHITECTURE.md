# ARCHITECTURE: Hybrid Stack Overview

این سند خلاصهٔ معماری پیشنهادی برای VirasphereGlobal است. هدف: ارائه داشبورد سازمانی با قابلیت‌های AI، multi-region spawn (همزادهای جغرافیایی)، و لایهٔ ناظر برای کنترل خروجی‌ها.

Stack پیشنهادی
- Frontend: Next.js (TypeScript) - صفحات owner و relatives، i18n، Edge functions
- Backend Gateway: NestJS (TypeScript) - auth, RBAC, orchestration
- AI services: FastAPI (Python) - سرویس‌های تولید متن/صوت/ویدیو، اجرا روی nodes با GPU در صورت نیاز
- Queue/Worker: Redis + BullMQ (یا Celery برای بخش پایتون)
- DB: PostgreSQL (Cloud SQL) با read replicas برای regionها
- Vector DB: Pinecone یا Weaviate برای personalization و RAG
- Object Storage: GCS (region-specific buckets)

Multi-region spawn (همزادها)
- هر region می‌تواند یک namespace یا کلاستر جداگانه داشته باشد یا از replication برای data residency استفاده شود.
- Provisioning: Terraform + GitOps (ArgoCD)
- DNS/TLS: cert-manager و external-dns برای setup خودکار زیردامنه‌ها

Token management & fallback
- هر درخواست AI ثبت و هزینهٔ تقریبی محاسبه می‌شود.
- Tiered model: primary (cloud), secondary (cheaper hosted), fallback (local open-source)؛ auto-switch هنگام خطا یا اتمام اعتبار.
- Caching و batching برای کاهش توکن و هزینه.

Supervisor (ایست بازرسی خروجی‌ها)
- هر خروجی AI ابتدا به queue بازبینی می‌رود.
- پنل admin: مشاهده، تایید/رد، و لاگ هر فعالیت.

Security & Auth
- WebAuthn (passwordless) برای ورود مالک و مدیران
- JWT با claims شامل org_id و role
- Secrets: HashiCorp Vault یا Cloud Secret Manager

Monitoring
- Prometheus + Grafana, Sentry, ELK/Loki

