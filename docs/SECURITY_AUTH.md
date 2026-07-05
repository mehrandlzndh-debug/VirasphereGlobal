# SECURITY_AUTH: MFA & Biometric Design

این سند طراحی و پیاده‌سازی پیشنهادی چندمرحله‌ای برای احراز هویت امن در VirasphereGlobal را شرح می‌دهد. اهداف:
- ترکیب رمز عبور قوی + اثرانگشت (WebAuthn) + تایید چهره (Face Auth) + روش‌های جایگزین (کد پیامکی، تماس صوتی خودکار) برای ورود و عملیات حساس.
- فراهم کردن کلیدهای دسترسی اضطراری/سرویس (API Keys) با قابلیت محدودسازی و تاریخ انقضا.
- حفظ حریم خصوصی و انطباق: جمع‌آوری بیومتریک فقط به‌عنوان کلید عمومی/attestation ذخیره می‌شود؛ تصویر/ویدئو چهره نباید خام ذخیره شود مگر با رضایت و سیاست حفاظت.

معماری و جریان‌ها

1) ثبت‌نام MFA (مراحل توسط کاربر مالک انجام می‌شود)
- مرحله 1: رمز عبور قوی (قوانین password policy: min 12 chars, uppercase, lowercase, digit, symbol) ذخیره شده به صورت bcrypt.
- مرحله 2: ثبت WebAuthn (اثرانگشت روی دستگاه)
  - backend یک challenge ایجاد می‌کند و frontend با navigator.credentials.create() عملیات ثبت را انجام می‌دهد.
  - ذخیره: credential_id, public_key, attestation_type, transports, sign_count.
- مرحله 3: ثبت Face Auth (اختیاری اما برای مالک اجباری پیشنهاد می‌شود)
  - دو رویکرد:
    A) Platform Face ID (در صورتی که مرورگر/دستگاه از WebAuthn با user-verification=True پشتیبانی کند، از همان WebAuthn برای face استفاده می‌کنیم).
    B) Third-party face service (مثلاً Face++/Microsoft Azure Face API) — در این حالت: از کاربر درخواست capture یک تصویر/ویدئو کوتاه به‌صورت secure و ephemeral می‌کنیم، یک template یا embedding از تصویر تولید می‌شود و به صورت رمزنگاری‌شده ذخیره می‌شود. حتماً از رضایت‌نامه و retention policy استفاده کنید.

2) ورود (Authentication)
- مرحله 1: کاربر نام کاربری را وارد می‌کند و password بررسی می‌شود (rate limit و account lockout فعال).
- مرحله 2: درخواست WebAuthn assertion (effectively fingerprint or platform authenticator) با user verification درخواست می‌شود.
- مرحله 3 (در صورت تنظیم): Face verification prompt (اگر WebAuthn platform provides face, skip separate step).
- مرحله 4: در صورتی که دستگاه WebAuthn ندارند یا خطا رخ دهد، fallback: ارسال OTP پیامکی یا تماس خودکار برای تایید.

3) تایید تماس خودکار و SMS (fallback & emergency)
- استفاده از Twilio Verify یا API تماس:
  - برای تماس خودکار: سیستم یک کد تولید می‌کند و از طریق یک call از Twilio پخش می‌شود یا از Verify API استفاده می‌کنیم که خودکار صحت را بررسی می‌کند.
  - SMS: ارسال کد 6 رقمی با expiration 5 دقیقه و ذخیرهٔ تلاش‌ها برای جلوگیری از brute-force.

4) کلیدهای دسترسی اضطراری (API Keys)
- هر API key دارای سکوپ/لیمیتر (scopes, expiry, usage quota) است.
- ذخیره: hashed key (مانند hashed token) در DB، و کلید کامل فقط یکبار هنگام ای��اد به کاربر نشان داده می‌شود.
- قابلیت ریvoke و مشاهده history و sessions مرتبط.

Privacy & Compliance
- هر دادهٔ بیومتریک باید با حداکثر دقت محافظت گردد. توصیه: ذخیرهٔ فقط public key یا template‌های embedding رمزنگاری‌شده و حذف تصاویر خام پس از تولید embedding.
- سیاست retention: default حذف پس از 90 روز از عدم‌فعالیت مگر رضایت صریح.
- لاگ‌ها: ذخیره audit logs برای هر ورود/رد و عملیات حساس.

Operational Notes
- نیاز به HTTPS و secure context برای WebAuthn/Face capture.
- برای تست محلی از ngrok یا podob سرویس‌های secure tunnel استفاده کنید.
- ارائه مستندات UX برای کاربران دربارهٔ نحوهٔ ثبت اثرانگشت/چهره و مدیریت API keys.
