// pages/api/send-whatsapp.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const from = process.env.TWILIO_WHATSAPP_FROM!; // 'whatsapp:+14155238886' など

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: '電話番号が必要です' });

  // phoneは "whatsapp:+819012345678" の形式で送信
  try {
    const message = await client.messages.create({
      from,
      to: `whatsapp:${phone}`,
      body: 'Hello from Twilio WhatsApp Bot!',
    });
    return res.status(200).json({ status: 'ok', sid: message.sid });
  } catch (e) {
    return res.status(500).json({ error: 'API送信失敗', details: e });
  }
}
