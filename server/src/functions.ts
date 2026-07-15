import { onRequest } from 'firebase-functions/v2/https'
import { createApp } from './app'

// The whole Express API, exposed as a single 2nd-gen Cloud Function.
// Firebase Hosting rewrites /api/** to this (see firebase.json), so the
// client keeps calling relative /api/... paths in production.
export const api = onRequest(
  {
    region: 'europe-west3',
    memory: '512MiB',
    maxInstances: 10,
  },
  createApp(),
)
