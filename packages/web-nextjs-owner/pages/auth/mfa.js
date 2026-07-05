// packages/web-nextjs-owner/pages/auth/mfa.js
import React, { useState } from 'react';

export default function MfaPage() {
  const [status, setStatus] = useState('ready');

  async function startRegister() {
    setStatus('starting');
    const res = await fetch('/api/auth/mfa/start-webauthn-registration', { method: 'POST' });
    const json = await res.json();
    // call navigator.credentials.create() with options
    setStatus('registered');
  }

  async function startAuth() {
    const res = await fetch('/api/auth/mfa/start-webauthn-auth', { method: 'POST' });
    const json = await res.json();
    // call navigator.credentials.get() with options
    // then POST to finish-webauthn-auth
  }

  return (
    <div>
      <h2>MFA - ثبت اثرانگشت / ورود بیومتریک</h2>
      <p>برای ثبت اثرانگشت دستگاه خود، روی دکمه زیر کلیک کنید (دستگاه شما باید WebAuthn پشتیبانی کند).</p>
      <button onClick={startRegister}>Register fingerprint/device</button>
      <hr />
      <h3>Login</h3>
      <button onClick={startAuth}>Login with fingerprint</button>
      <p>Status: {status}</p>
    </div>
  );
}
