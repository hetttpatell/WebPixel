/**
 * Resend Email Integration Module for WebPixel Studio
 * Dispatches HTML emails via local Node dev proxy (/api/send-email) or Vercel Serverless API
 */

export async function sendResendEmail({ to, subject, html, replyTo }) {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY || 're_5HkFCzAF_HrKTfEfpBhBeqrCx1YfbBqEs'
  const recipient = to || import.meta.env.VITE_CONTACT_EMAIL || 'hetpatel140505@gmail.com'

  const payload = {
    apiKey,
    to: recipient,
    replyTo,
    subject,
    html,
  }

  // 1. Try internal /api/send-email endpoint (prevents CORS issues in browser)
  try {
    const apiRes = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await apiRes.json()

    if (apiRes.ok && !data.error) {
      console.log('📬 Resend Email sent successfully via /api/send-email:', data)
      return { success: true, data }
    } else {
      console.warn('Response error from /api/send-email:', data)
    }
  } catch (err) {
    console.warn('/api/send-email endpoint not reachable, attempting direct fetch:', err.message)
  }

  // 2. Direct Resend API Fallback
  try {
    const directRes = await fetch('https://api.resend.com/emails', {
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

    const data = await directRes.json()

    if (directRes.ok && !data.error) {
      console.log('📬 Resend Email sent directly:', data)
      return { success: true, data }
    } else {
      console.error('Direct Resend API error:', data)
      return { success: false, error: data }
    }
  } catch (err) {
    console.error('Failed direct Resend fetch:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Helper to construct formatted HTML email notification for WebPixel Studio lead submissions
 */
export function buildLeadEmailHtml(leadData) {
  const { name, email, phone, company, projectType, service, budget, timeline, message, features, formType } = leadData

  return `
    <div style="font-family: 'Space Grotesk', system-ui, sans-serif; background-color: #FFFDF5; padding: 24px; color: #000000; border: 4px solid #000000; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #FF6B6B; color: #000000; padding: 12px 16px; border-bottom: 4px solid #000000; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
        NEW INBOUND LEAD — ${formType || 'WEBSITE INQUIRY'}
      </div>
      
      <div style="padding: 20px; background-color: #FFFFFF; border: 2px solid #000000; margin-top: 16px;">
        <h2 style="font-size: 20px; font-weight: 900; text-transform: uppercase; margin-top: 0; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px;">
          ${name || 'Anonymous Prospect'}
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 700; color: #666; width: 120px;">Email:</td>
            <td style="padding: 8px 0; font-weight: 900;"><a href="mailto:${email}" style="color: #FF6B6B; text-decoration: none;">${email}</a></td>
          </tr>
          ${phone ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Phone:</td><td style="padding: 8px 0; font-weight: 900;">${phone}</td></tr>` : ''}
          ${company ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Company:</td><td style="padding: 8px 0; font-weight: 900;">${company}</td></tr>` : ''}
          ${projectType || service ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Service:</td><td style="padding: 8px 0; font-weight: 900;"><span style="background-color: #FFD93D; padding: 2px 6px; border: 1px solid #000;">${projectType || service}</span></td></tr>` : ''}
          ${budget ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Budget:</td><td style="padding: 8px 0; font-weight: 900;">${budget}</td></tr>` : ''}
          ${timeline ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Timeline:</td><td style="padding: 8px 0; font-weight: 900;">${timeline}</td></tr>` : ''}
          ${features && features.length > 0 ? `<tr><td style="padding: 8px 0; font-weight: 700; color: #666;">Features:</td><td style="padding: 8px 0; font-weight: 700;">${features.join(', ')}</td></tr>` : ''}
        </table>

        ${message ? `
          <div style="margin-top: 20px; border-top: 2px solid #000; padding-top: 12px;">
            <p style="font-weight: 900; text-transform: uppercase; font-size: 12px; margin-bottom: 6px;">Message Detail:</p>
            <p style="background-color: #FFFDF5; padding: 12px; border: 2px solid #000; font-size: 14px; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        ` : ''}
      </div>

      <div style="margin-top: 16px; font-size: 11px; color: #666; font-family: monospace; text-align: center;">
        WebPixel Studio Lead Routing System • ${new Date().toLocaleString()}
      </div>
    </div>
  `
}
