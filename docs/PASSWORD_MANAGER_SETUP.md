# PASSWORD_MANAGER: طراحی و پیاده‌سازی داخلی

خلاصه: مدیر رمزها (Vault) داخل داشبورد بر پایهٔ client-side encryption پیاده می‌شود تا حتی در صورت دسترسی به سرور، رمزها امن باقی بمانند.

مکانیزم خلاصه
- هنگام فعال‌سازی: در مرورگر یک Vault Encryption Key (VEK) تولید می‌شود.
- VEK با یک Key-Encryption-Key (KEK) رمزنگاری می‌شود. KEK در KMS یا از WebAuthn-derived secret محافظت می‌شود.
- رمزهای کاربری با VEK رمز شده و در DB ذخیره می‌شوند.
- برای استفاده: مرورگر پس از WebAuthn challenge signature، KEK را باز کرده و VEK را بدست می‌آورد و رمز را در حافظهٔ موقت باز می‌کند.

ویژگی‌ها
- Generate password (قوی، تنظیمات طول و نماد)
- Copy-to-clipboard با auto-clear
- Grouping و اشتراک اختیاری بین اعضای سازمان (owner control)

