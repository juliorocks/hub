/**
 * api/lead.js — Vercel Serverless Function
 * Recebe dados do formulário e envia para Meta Conversions API (server-side)
 * Endpoint: POST /api/lead
 */

const PIXEL_ID = '1598794954687611';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
const API_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

// Hash SHA-256 para dados de usuário (exigido pela Meta CAPI)
async function sha256(value) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Normaliza número de telefone para formato E.164 sem o +
function normalizePhone(phone) {
  if (!phone) return null;
  return phone.replace(/\D/g, '').replace(/^0/, '55');
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!ACCESS_TOKEN) {
    console.error('[CAPI] META_CAPI_TOKEN não configurado');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const { name, email, whatsapp, course_name, category, url, event_id } = req.body;

    // Hash dos dados PII
    const [hashedEmail, hashedPhone, hashedName] = await Promise.all([
      sha256(email),
      sha256(normalizePhone(whatsapp)),
      sha256(name),
    ]);

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || `lead_${Date.now()}`,
          event_source_url: url,
          action_source: 'website',
          user_data: {
            em: hashedEmail,
            ph: hashedPhone,
            fn: hashedName,
            client_user_agent: req.headers['user-agent'],
            client_ip_address: req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress,
          },
          custom_data: {
            content_name: course_name,
            content_category: category,
            currency: 'BRL',
            value: 0,
          },
        },
      ],
    };

    const response = await fetch(`${API_URL}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[CAPI] Erro da Meta:', result);
      return res.status(502).json({ error: 'Meta API error', details: result });
    }

    return res.status(200).json({ success: true, events_received: result.events_received });

  } catch (error) {
    console.error('[CAPI] Erro interno:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
