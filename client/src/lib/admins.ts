export interface AdminUser {
  uid: string
  email: string
  displayName: string | null
  createdAt: string | null
  bootstrap: boolean
}

async function authFetch(path: string, token: string, init: RequestInit = {}): Promise<Record<string, unknown>> {
  const res = await fetch(path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  })
  const data = (await res.json().catch(() => null)) as Record<string, unknown> | null
  if (!res.ok || !data?.success) {
    throw new Error((data?.message as string) ?? 'Request failed. Please try again.')
  }
  return data
}

export async function fetchAdmins(token: string): Promise<AdminUser[]> {
  const data = await authFetch('/api/admins', token)
  return (data.admins as AdminUser[]) ?? []
}

export async function createAdmin(
  token: string,
  input: { email: string; password: string; displayName?: string },
): Promise<AdminUser> {
  const data = await authFetch('/api/admins', token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return data.admin as AdminUser
}

export function deleteAdmin(token: string, uid: string): Promise<unknown> {
  return authFetch(`/api/admins/${uid}`, token, { method: 'DELETE' })
}
