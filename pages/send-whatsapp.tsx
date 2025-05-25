// pages/send-whatsapp.tsx
import { useState } from 'react';

export default function SendWhatsAppPage() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('送信中...');
    const res = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    if (res.ok) {
      setStatus('送信完了！');
    } else {
      setStatus('送信失敗...');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <label>
        電話番号（国番号込み、例: 819012345678）:
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </label>
      <button type="submit" style={{ padding: '8px 24px' }}>送信</button>
      <div style={{ marginTop: 10 }}>{status}</div>
    </form>
  );
}
