import { config } from 'dotenv'
import { resolve } from 'node:path'

// Load server/.env explicitly (two levels up from this file: src/config or dist/config),
// so it works no matter what the process's current working directory is.
config({ path: resolve(__dirname, '../../.env') })

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
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    serviceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT,
    // Named STORAGE_BUCKET (not FIREBASE_*) because Cloud Functions reserves the FIREBASE_ prefix.
    storageBucket: process.env.STORAGE_BUCKET,
  },
  // Comma-separated list of emails allowed to sign in to /admin.
  adminEmails: (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
}

export const isProduction = env.nodeEnv === 'production'
