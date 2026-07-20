export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, subject, html, replyTo, apiKey: clientApiKey } = req.body
    const apiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY || clientApiKey || 're_5HkFCzAF_HrKTfEfpBhBeqrCx1YfbBqEs'
    const recipient = process.env.VITE_CONTACT_EMAIL || to || 'hetpatel140505@gmail.com'

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [recipient],
        reply_to: replyTo,
        subject,
        html,
      }),
    })

    const data = await response.json()
    return res.status(response.status).json(data)
  } catch (error) {
    console.error('Vercel Resend serverless function error:', error)
    return res.status(500).json({ error: error.message })
  }
}
