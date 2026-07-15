import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { cardClass, formatDate } from './adminStyles'
import {
  deleteApplication,
  deleteContact,
  fetchApplications,
  fetchContacts,
  setApplicationRead,
  setContactRead,
} from '../../lib/submissions'
import type { ApplicationSubmission, ContactSubmission } from '../../lib/submissions'

type Tab = 'contacts' | 'applications'

function UnreadDot() {
  return <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-pomelo-blue" aria-label="Unread" />
}

function RowActions({
  read,
  busy,
  onToggleRead,
  onDelete,
}: {
  read: boolean
  busy: boolean
  onToggleRead: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onToggleRead}
        disabled={busy}
        className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-pomelo-blue hover:text-pomelo-blue disabled:opacity-50"
      >
        {read ? 'Mark unread' : 'Mark read'}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-400 hover:bg-red-400/10 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}

function Chip({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
      <span className="text-white/40">{label}:</span> {value}
    </span>
  )
}

export default function InboxSection() {
  const { getToken } = useAuth()
  const [tab, setTab] = useState<Tab>('contacts')
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [applications, setApplications] = useState<ApplicationSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const token = await getToken()
      const [c, a] = await Promise.all([fetchContacts(token), fetchApplications(token)])
      setContacts(c)
      setApplications(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load submissions.')
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void load()
  }, [load])

  const contactUnread = contacts.filter((c) => !c.read).length
  const appUnread = applications.filter((a) => !a.read).length

  const toggleContact = async (item: ContactSubmission) => {
    setBusyId(item.id)
    try {
      const token = await getToken()
      await setContactRead(token, item.id, !item.read)
      setContacts((prev) => prev.map((c) => (c.id === item.id ? { ...c, read: !item.read } : c)))
    } finally {
      setBusyId(null)
    }
  }

  const removeContact = async (id: string) => {
    if (!window.confirm('Delete this message?')) return
    setBusyId(id)
    try {
      const token = await getToken()
      await deleteContact(token, id)
      setContacts((prev) => prev.filter((c) => c.id !== id))
    } finally {
      setBusyId(null)
    }
  }

  const toggleApp = async (item: ApplicationSubmission) => {
    setBusyId(item.id)
    try {
      const token = await getToken()
      await setApplicationRead(token, item.id, !item.read)
      setApplications((prev) => prev.map((a) => (a.id === item.id ? { ...a, read: !item.read } : a)))
    } finally {
      setBusyId(null)
    }
  }

  const removeApp = async (id: string) => {
    if (!window.confirm('Delete this application and its photos?')) return
    setBusyId(id)
    try {
      const token = await getToken()
      await deleteApplication(token, id)
      setApplications((prev) => prev.filter((a) => a.id !== id))
    } finally {
      setBusyId(null)
    }
  }

  const subTab = (key: Tab, label: string, unread: number) => (
    <button
      type="button"
      onClick={() => setTab(key)}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        tab === key ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
      }`}
    >
      {label}
      {unread > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pomelo-blue px-1.5 text-[0.7rem] font-bold text-white">
          {unread}
        </span>
      )}
    </button>
  )

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        {subTab('contacts', 'Contact messages', contactUnread)}
        {subTab('applications', 'Model applications', appUnread)}
      </div>

      {loading ? (
        <p className="text-white/50">Loading submissions…</p>
      ) : error ? (
        <div className={cardClass}>
          <p className="text-red-400">{error}</p>
          <button type="button" onClick={() => void load()} className="mt-3 text-sm font-semibold text-pomelo-blue">
            Retry
          </button>
        </div>
      ) : tab === 'contacts' ? (
        contacts.length === 0 ? (
          <div className={cardClass}>
            <p className="text-white/60">No contact messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className={`${cardClass} ${c.read ? 'opacity-70' : ''}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!c.read && <UnreadDot />}
                      <p className="font-display text-lg text-white">{c.subject}</p>
                    </div>
                    <p className="mt-1 text-sm text-white/70">
                      {c.name} ·{' '}
                      <a href={`mailto:${c.email}`} className="text-pomelo-blue hover:underline">
                        {c.email}
                      </a>
                      {c.phone ? ` · ${c.phone}` : ''}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-white/80">{c.message}</p>
                    <p className="mt-3 text-xs text-white/40">{formatDate(c.createdAt)}</p>
                  </div>
                  <RowActions read={c.read} busy={busyId === c.id} onToggleRead={() => toggleContact(c)} onDelete={() => removeContact(c.id)} />
                </div>
              </div>
            ))}
          </div>
        )
      ) : applications.length === 0 ? (
        <div className={cardClass}>
          <p className="text-white/60">No model applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((a) => (
            <div key={a.id} className={`${cardClass} ${a.read ? 'opacity-70' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!a.read && <UnreadDot />}
                    <p className="font-display text-xl text-white">{a.fullName}</p>
                  </div>
                  <p className="mt-1 text-sm text-white/70">
                    {a.phone}
                    {a.email ? (
                      <>
                        {' · '}
                        <a href={`mailto:${a.email}`} className="text-pomelo-blue hover:underline">
                          {a.email}
                        </a>
                      </>
                    ) : null}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip label="Age" value={a.age} />
                    <Chip label="Height" value={a.height} />
                    <Chip label="Weight" value={a.weight} />
                    <Chip label="Hair" value={a.hairColor} />
                    <Chip label="Eyes" value={a.eyeColor} />
                    <Chip label="Shoe" value={a.shoeSize} />
                    <Chip label="Shirt" value={a.shirtSize} />
                    <Chip label="Languages" value={a.languages} />
                  </div>
                  {a.photos.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {a.photos.map((p) => (
                        <a
                          key={p.path}
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group block"
                          title={p.label}
                        >
                          <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/15">
                            <img src={p.url} alt={p.label} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                          </div>
                          <span className="mt-1 block text-center text-[0.6rem] uppercase tracking-wider text-white/40">
                            {p.label.replace(/-/g, ' ')}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                  <p className="mt-3 text-xs text-white/40">{formatDate(a.createdAt)}</p>
                </div>
                <RowActions read={a.read} busy={busyId === a.id} onToggleRead={() => toggleApp(a)} onDelete={() => removeApp(a.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
