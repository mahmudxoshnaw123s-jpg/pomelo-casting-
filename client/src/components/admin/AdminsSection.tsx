import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { cardClass, fieldClass, formatDate } from './adminStyles'
import { createAdmin, deleteAdmin, fetchAdmins } from '../../lib/admins'
import type { AdminUser } from '../../lib/admins'

export default function AdminsSection() {
  const { getToken, user } = useAuth()
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [busyUid, setBusyUid] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const token = await getToken()
      setAdmins(await fetchAdmins(token))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load admins.')
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void load()
  }, [load])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || password.length < 6) {
      setCreateError('Enter an email and a password of at least 6 characters.')
      return
    }
    setCreating(true)
    setCreateError('')
    try {
      const token = await getToken()
      const admin = await createAdmin(token, { email: email.trim(), password, displayName: displayName.trim() || undefined })
      setAdmins((prev) => [...prev, admin].sort((a, b) => a.email.localeCompare(b.email)))
      setEmail('')
      setPassword('')
      setDisplayName('')
      setShowAdd(false)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not create the admin.')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (admin: AdminUser) => {
    if (!window.confirm(`Remove admin access for ${admin.email}? Their account will be deleted.`)) return
    setBusyUid(admin.uid)
    try {
      const token = await getToken()
      await deleteAdmin(token, admin.uid)
      setAdmins((prev) => prev.filter((a) => a.uid !== admin.uid))
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not remove the admin.')
    } finally {
      setBusyUid(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">{admins.length} admin{admins.length === 1 ? '' : 's'}</p>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20"
        >
          {showAdd ? 'Close' : '+ Add admin'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className={`${cardClass} mb-8`}>
          <h2 className="mb-6 font-display text-2xl text-white">New admin</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="off" className={fieldClass} />
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Name (optional)" className={fieldClass} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Temporary password (min 6 chars)"
              autoComplete="new-password"
              className={`${fieldClass} sm:col-span-2`}
            />
          </div>
          {createError && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-400">
              {createError}
            </p>
          )}
          <button
            type="submit"
            disabled={creating}
            className="mt-6 rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20 disabled:opacity-60"
          >
            {creating ? 'Creating…' : 'Create admin'}
          </button>
          <p className="mt-3 text-xs text-white/40">
            They can sign in immediately with this email and password (and change it later).
          </p>
        </form>
      )}

      {loading ? (
        <p className="text-white/50">Loading admins…</p>
      ) : error ? (
        <div className={cardClass}>
          <p className="text-red-400">{error}</p>
          <button type="button" onClick={() => void load()} className="mt-3 text-sm font-semibold text-pomelo-blue">
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => {
            const isSelf = user?.uid === admin.uid
            const locked = isSelf || admin.bootstrap
            return (
              <div key={admin.uid} className={`${cardClass} flex flex-wrap items-center justify-between gap-4`}>
                <div>
                  <p className="font-semibold text-white">
                    {admin.displayName || admin.email}
                    {isSelf && <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-white/60">You</span>}
                    {admin.bootstrap && (
                      <span className="ml-2 rounded-full bg-pomelo-purple/30 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-white/70">Owner</span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    {admin.email}
                    {admin.createdAt ? ` · added ${formatDate(admin.createdAt)}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(admin)}
                  disabled={locked || busyUid === admin.uid}
                  title={isSelf ? 'You cannot remove yourself' : admin.bootstrap ? 'Owner account (managed in server config)' : 'Remove admin'}
                  className="rounded-full border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:border-red-400 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
