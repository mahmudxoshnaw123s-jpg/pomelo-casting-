import 'dotenv/config'

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  clientOrigin: required('CLIENT_ORIGIN', 'http://localhost:5173'),
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  contactRecipient: process.env.CONTACT_RECIPIENT ?? 'hello@pomeloagency.com',
}

export const isProduction = env.nodeEnv === 'production'
