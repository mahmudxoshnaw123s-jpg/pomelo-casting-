import { getApps, initializeApp } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/** True only when the client has enough config to run Firebase Auth. */
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.authDomain)

let app: FirebaseApp | undefined
let authInstance: Auth | undefined

if (isFirebaseConfigured) {
  app = getApps()[0] ?? initializeApp(config)
  authInstance = getAuth(app)
}

export const auth = authInstance
