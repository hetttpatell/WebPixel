import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function resendDevPlugin() {
  return {
    name: 'resend-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            const data = JSON.parse(body)
            const env = loadEnv('development', process.cwd(), '')
            const apiKey = env.VITE_RESEND_API_KEY || data.apiKey || 're_5HkFCzAF_HrKTfEfpBhBeqrCx1YfbBqEs'
            const recipient = env.VITE_CONTACT_EMAIL || data.to || 'hetpatel140505@gmail.com'

            console.log('⚡ [Resend Dev Server] Sending email to:', recipient, 'Subject:', data.subject)

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: [recipient],
                reply_to: data.replyTo,
                subject: data.subject,
                html: data.html,
              }),
            })

            const resendData = await resendRes.json()
            console.log('📬 [Resend Dev Server] Response:', resendRes.status, resendData)

            res.statusCode = resendRes.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resendData))
          } catch (err) {
            console.error('❌ [Resend Dev Server Error]:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    resendDevPlugin(),
  ],
})
