import { adminAuth } from '../config/firebase'
import { env } from '../config/env'
import type { UserRecord } from 'firebase-admin/auth'

export interface AdminUser {
  uid: string
  email: string
  displayName: string | null
  createdAt: string | null
  /** Managed via the ADMIN_EMAILS env allowlist — cannot be removed from the panel. */
  bootstrap: boolean
}

function isBootstrap(email: string): boolean {
  return env.adminEmails.includes(email.toLowerCase())
}

function toAdminUser(user: UserRecord): AdminUser {
  const email = user.email ?? ''
  return {
    uid: user.uid,
    email,
    displayName: user.displayName ?? null,
    createdAt: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toISOString() : null,
    bootstrap: isBootstrap(email),
  }
}

export async function listAdmins(): Promise<AdminUser[]> {
  const result = await adminAuth().listUsers(1000)
  return result.users
    .filter((u) => u.customClaims?.admin === true || isBootstrap(u.email ?? ''))
    .map(toAdminUser)
    .sort((a, b) => a.email.localeCompare(b.email))
}

export async function createAdmin(email: string, password: string, displayName?: string): Promise<AdminUser> {
  const user = await adminAuth().createUser({
    email,
    password,
    displayName: displayName?.trim() || undefined,
  })
  await adminAuth().setCustomUserClaims(user.uid, { admin: true })
  return toAdminUser(user)
}

export async function getAdminEmail(uid: string): Promise<string | null> {
  try {
    const user = await adminAuth().getUser(uid)
    return user.email ?? ''
  } catch {
    return null
  }
}

export async function deleteAdmin(uid: string): Promise<void> {
  await adminAuth().deleteUser(uid)
}
