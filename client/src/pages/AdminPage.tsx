import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminsSection from '../components/admin/AdminsSection'
import FaqSection from '../components/admin/FaqSection'
import InboxSection from '../components/admin/InboxSection'
import InsightsSection from '../components/admin/InsightsSection'
import RosterSection from '../components/admin/RosterSection'
import { cardClass, fieldClass, sectionClass } from '../components/admin/adminStyles'

function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? ''
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Incorrect email or password.'
  }
  if (code.includes('invalid-email')) return 'Enter a valid email address.'
  if (code.includes('too-many-requests')) return 'Too many attempts. Please wait a moment and try again.'
  return err instanceof Error ? err.message : 'Could not sign in.'
}

function LoginScreen() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`${sectionClass} flex items-center justify-center`}>
      <form onSubmit={handleSubmit} className={`${cardClass} w-full max-w-sm`}>
        <h1 className="font-display text-3xl italic text-white">Admin sign in</h1>
        <p className="mt-2 mb-6 text-sm text-white/50">Manage the Pomelo talent roster and submissions.</p>
        <div className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="Email" autoComplete="email" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20 transition-opacity disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

type Tab = 'roster' | 'insights' | 'faq' | 'inbox' | 'admins'

function Dashboard() {
  const { user, signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('roster')

  const tabButton = (key: Tab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(key)}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        tab === key ? 'bg-gradient-to-r from-pomelo-blue to-pomelo-purple text-white' : 'text-white/50 hover:text-white/80'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className={sectionClass}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl italic text-white">Pomelo admin</h1>
            <p className="mt-1 text-sm text-white/50">Signed in as {user?.email}</p>
          </div>
          <button type="button" onClick={() => void signOut()} className="text-sm font-semibold text-white/60 hover:text-white">
            Sign out
          </button>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
          {tabButton('roster', 'Talent roster')}
          {tabButton('insights', 'Insights')}
          {tabButton('faq', 'FAQ')}
          {tabButton('inbox', 'Inbox')}
          {tabButton('admins', 'Admins')}
        </div>

        {tab === 'roster' && <RosterSection />}
        {tab === 'insights' && <InsightsSection />}
        {tab === 'faq' && <FaqSection />}
        {tab === 'inbox' && <InboxSection />}
        {tab === 'admins' && <AdminsSection />}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const { configured, loading, user } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!configured) {
    return (
      <div className={`${sectionClass} flex items-center justify-center`}>
        <div className={`${cardClass} max-w-md text-center`}>
          <h1 className="font-display text-2xl italic text-white">Admin not configured</h1>
          <p className="mt-3 text-sm text-white/60">
            Firebase isn&rsquo;t set up on the client yet. Add the <code className="text-pomelo-blue">VITE_FIREBASE_*</code> values to{' '}
            <code className="text-pomelo-blue">client/.env</code> and restart the dev server.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`${sectionClass} flex items-center justify-center`}>
        <p className="text-white/50">Loading…</p>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginScreen />
}
