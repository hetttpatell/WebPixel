export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    
    // Check all potential sources for the Resend API key
    const apiKey =
      process.env.RESEND_API_KEY ||
      process.env.VITE_RESEND_API_KEY ||
      body.apiKey ||
      're_5HkFCzAF_HrKTfEfpBhBeqrCx1YfbBqEs'

    const recipient = process.env.VITE_CONTACT_EMAIL || body.to || 'hetpatel140505@gmail.com'

    if (!apiKey) {
      return res.status(401).json({ error: 'Resend API key missing' })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [recipient],
        reply_to: body.replyTo,
        subject: body.subject,
        html: body.html,
      }),
    })

    const data = await response.json()
    console.log('Vercel Resend response:', response.status, data)
    return res.status(response.status).json(data)
  } catch (error) {
    console.error('Vercel Resend serverless function error:', error)
    return res.status(500).json({ error: error.message })
  }
}
