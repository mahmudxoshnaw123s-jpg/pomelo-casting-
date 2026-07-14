import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { cardClass, fieldClass } from './adminStyles'
import { createFaq, deleteFaq, fetchFaqs, updateFaq } from '../../lib/faqs'
import type { Faq, FaqInput } from '../../lib/faqs'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/60'

function FaqForm({
  initial,
  submitting,
  error,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Faq
  submitting: boolean
  error?: string
  submitLabel: string
  onSubmit: (input: FaqInput) => void | Promise<void>
  onCancel?: () => void
}) {
  const [question, setQuestion] = useState(initial?.question ?? '')
  const [answer, setAnswer] = useState(initial?.answer ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [localError, setLocalError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !answer.trim()) {
      setLocalError('A question and answer are both required.')
      return
    }
    setLocalError('')
    void onSubmit({ question: question.trim(), answer: answer.trim(), category: category.trim() })
  }

  const shownError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="fq-category">
          Category <span className="normal-case text-white/35">(optional)</span>
        </label>
        <input id="fq-category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass} placeholder="Pricing" maxLength={60} />
      </div>
      <div>
        <label className={labelClass} htmlFor="fq-question">
          Question
        </label>
        <input id="fq-question" value={question} onChange={(e) => setQuestion(e.target.value)} className={fieldClass} placeholder="How does pricing work?" maxLength={300} />
      </div>
      <div>
        <label className={labelClass} htmlFor="fq-answer">
          Answer
        </label>
        <textarea
          id="fq-answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Pricing depends on project scope…"
          maxLength={2000}
        />
      </div>

      {shownError && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {shownError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20 transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm font-semibold text-white/60 hover:text-white">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

function FaqRow({
  faq,
  onUpdate,
  onDelete,
  busy,
}: {
  faq: Faq
  onUpdate: (id: string, input: FaqInput) => Promise<void>
  onDelete: (id: string) => Promise<void>
  busy: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [rowError, setRowError] = useState('')

  const handleEdit = async (input: FaqInput) => {
    setRowError('')
    try {
      await onUpdate(faq.id, input)
      setEditing(false)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this question?')) return
    setRowError('')
    try {
      await onDelete(faq.id)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  return (
    <div className={cardClass}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {faq.category && <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pomelo-blue/80">{faq.category}</p>}
          <p className="mt-1 font-semibold text-white">{faq.question}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{faq.answer}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-pomelo-blue hover:text-pomelo-blue"
          >
            {editing ? 'Close' : 'Edit'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="rounded-full border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:border-red-400 hover:bg-red-400/10 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      {rowError && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-400">
          {rowError}
        </p>
      )}

      {editing && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <FaqForm initial={faq} submitting={busy} submitLabel="Save changes" onSubmit={handleEdit} onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  )
}

export default function FaqSection() {
  const { getToken } = useAuth()
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setListError('')
    try {
      setFaqs(await fetchFaqs())
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Could not load FAQs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const handleCreate = async (input: FaqInput) => {
    setCreating(true)
    setCreateError('')
    try {
      const token = await getToken()
      const faq = await createFaq(token, input)
      setFaqs((prev) => [...prev, faq])
      setShowAdd(false)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not add the FAQ.')
    } finally {
      setCreating(false)
    }
  }

  const handleUpdate = async (id: string, input: FaqInput) => {
    setBusyId(id)
    try {
      const token = await getToken()
      const updated = await updateFaq(token, id, input)
      setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)))
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    try {
      const token = await getToken()
      await deleteFaq(token, id)
      setFaqs((prev) => prev.filter((f) => f.id !== id))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">{faqs.length} question{faqs.length === 1 ? '' : 's'}</p>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20"
        >
          {showAdd ? 'Close' : '+ Add question'}
        </button>
      </div>

      {showAdd && (
        <div className={`${cardClass} mb-8`}>
          <h2 className="mb-6 font-display text-2xl italic text-white">New question</h2>
          <FaqForm submitting={creating} error={createError} submitLabel="Add question" onSubmit={handleCreate} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading questions…</p>
      ) : listError ? (
        <div className={cardClass}>
          <p className="text-red-400">{listError}</p>
          <button type="button" onClick={() => void load()} className="mt-3 text-sm font-semibold text-pomelo-blue">
            Retry
          </button>
        </div>
      ) : faqs.length === 0 ? (
        <div className={cardClass}>
          <p className="text-white/60">No questions yet. Click “Add question” to create the first one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FaqRow key={faq.id} faq={faq} onUpdate={handleUpdate} onDelete={handleDelete} busy={busyId === faq.id} />
          ))}
        </div>
      )}
    </div>
  )
}
