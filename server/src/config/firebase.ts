import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { env } from './env'

/**
 * Resolve the service account credentials from (in priority order):
 *   1. server/serviceAccountKey.json  (git-ignored file)
 *   2. FIREBASE_SERVICE_ACCOUNT  (the whole JSON, as a single env var)
 *   3. FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY
 * Returns null when nothing is configured yet, so the rest of the API keeps working.
 */
function loadServiceAccount(): ServiceAccount | null {
  const keyPath = resolve(process.cwd(), 'serviceAccountKey.json')
  if (existsSync(keyPath)) {
    return JSON.parse(readFileSync(keyPath, 'utf8')) as ServiceAccount
  }

  if (env.firebase.serviceAccountJson) {
    return JSON.parse(env.firebase.serviceAccountJson) as ServiceAccount
  }

  const { projectId, clientEmail, privateKey } = env.firebase
  if (projectId && clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      // Env vars store newlines as the literal characters "\n"; restore them.
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }
  }

  return null
}

let cachedError: string | null = null
let initialized = false

// True when running on Google infrastructure (Cloud Functions / Cloud Run),
// where Application Default Credentials are available without a key file.
function onGoogleInfra(): boolean {
  return Boolean(process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.FUNCTION_SIGNATURE_TYPE)
}

function ensureApp() {
  if (getApps().length > 0) return
  if (!env.firebase.storageBucket) {
    throw new Error('Missing FIREBASE_STORAGE_BUCKET environment variable.')
  }

  const serviceAccount = loadServiceAccount()
  if (serviceAccount) {
    // Local / self-hosted: explicit service account key.
    initializeApp({ credential: cert(serviceAccount), storageBucket: env.firebase.storageBucket })
  } else if (onGoogleInfra()) {
    // Deployed to Cloud Functions/Run: use the runtime's built-in credentials.
    initializeApp({ storageBucket: env.firebase.storageBucket })
  } else {
    throw new Error(
      'Firebase is not configured. Add server/serviceAccountKey.json (or FIREBASE_* env vars) and set FIREBASE_STORAGE_BUCKET.',
    )
  }
  initialized = true
}

/** True once the SDK has valid config — lets routes return a clean 503 otherwise. */
export function isFirebaseConfigured(): boolean {
  if (initialized) return true
  try {
    ensureApp()
    return true
  } catch (err) {
    cachedError = err instanceof Error ? err.message : String(err)
    return false
  }
}

export function firebaseConfigError(): string {
  return cachedError ?? 'Firebase is not configured.'
}

export function db() {
  ensureApp()
  return getFirestore()
}

export function bucket() {
  ensureApp()
  return getStorage().bucket()
}

export function adminAuth() {
  ensureApp()
  return getAuth()
}
