# CLOUD_STORAGE_SETUP: محل ذخیره‌سازی همیشگی و دسترسی جهانی امن

هدف: فراهم کردن دسترسی جهانی، امن و همیشه‌در دسترس به فایل‌های غیرحساس و نسخه‌های رمزنگاری‌شده از کلیدها.

پیشنهاد فنی
1) Cloud object storage با client-side encryption:
   - فایل‌های حساس: ابتدا توسط کلید VEK در client رمز می‌شوند، سپس به GCS/Cloud provider ریخته می‌شوند. cloud فقط نسخهٔ رمزنگاری‌شده را نگهداری می‌کند.
   - GCP: استفاده از GCS با CMEK (GCP KMS) برای لایهٔ دوم محافظت و object versioning فعال.
2) دسترسی و انتشار:
   - دسترسی‌ها از طریق IAM و short-lived signed URLs که توسط backend تولید میشود؛ backend فقط بعد از احراز هویت WebAuthn لینک تولید می‌کند.
3) Always-available drive:
   - یک service index (metadata DB) نگهداری می‌شود که اطلاعات فایل‌ها، owner, encrypted_key_ref را دارد. کاربران با ورود WebAuthn می‌توانند فایل‌های رمز شده را بازیابی و در کلاینت بازگشایی کنند.

مزایا
- cloud همیشه در دسترس است و replication جغرافیایی را فراهم می‌کند.
- بدون نگهداری plaintext در cloud.

