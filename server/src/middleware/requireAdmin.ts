import type { NextFunction, Request, Response } from 'express'
import { adminAuth, isFirebaseConfigured, firebaseConfigError } from '../config/firebase'
import { env } from '../config/env'

export interface AdminRequest extends Request {
  admin?: { uid: string; email: string }
}

/**
 * Guards the admin write routes. Expects `Authorization: Bearer <Firebase ID token>`,
 * verifies it with the Admin SDK, and confirms the signed-in email is on ADMIN_EMAILS.
 */
export async function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  if (!isFirebaseConfigured()) {
    res.status(503).json({ success: false, message: firebaseConfigError() })
    return
  }

  const header = req.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token) {
    res.status(401).json({ success: false, message: 'Missing authentication token.' })
    return
  }

  try {
    const decoded = await adminAuth().verifyIdToken(token)
    const email = (decoded.email ?? '').toLowerCase()

    // Access is granted either by the `admin` custom claim (admins created from the panel)
    // or by the bootstrap ADMIN_EMAILS allowlist (the first/owner accounts).
    const isClaimAdmin = decoded.admin === true
    const isAllowlisted = env.adminEmails.includes(email)
    if (!isClaimAdmin && !isAllowlisted) {
      res.status(403).json({ success: false, message: 'This account is not authorized for admin access.' })
      return
    }

    req.admin = { uid: decoded.uid, email }
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired session. Please sign in again.' })
  }
}
