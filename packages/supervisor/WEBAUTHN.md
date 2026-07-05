# WebAuthn integration notes and minimal example

WebAuthn allows passwordless authentication using platform authenticators (مثلاً اثرانگشت روی دستگاه).

راهنما (خلاصه):
1. کاربر در frontend درخواست ثبت device را می‌دهد. frontend از navigator.credentials.create() استفاده می‌کند.
2. backend یک challenge ایجاد و برمی‌گرداند. بعد از ثبت در دستگاه، public key و اطلاعات credential به backend ارسال و ذخیره می‌شود.
3. برای ورود، backend دوباره challenge ایجاد کرده و frontend با navigator.credentials.get() پاسخ را ارسال می‌کند.

نمونه‌های کد کامل در اینترنت و documentation رسمی WebAuthn موجود است. این پرونده یک راهنمای شروع به کار است.
