import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ModelForm from './ModelForm'
import { cardClass } from './adminStyles'
import { createModel, deleteModel, fetchModels, updateModel } from '../../lib/models'
import type { TalentModel } from '../../lib/models'

function ModelRow({
  model,
  onUpdate,
  onDelete,
  busy,
}: {
  model: TalentModel
  onUpdate: (id: string, formData: FormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
  busy: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [rowError, setRowError] = useState('')
  const cover = model.images[0]?.url

  const toggleFeatured = async () => {
    setRowError('')
    const formData = new FormData()
    formData.append('featured', String(!model.featured))
    try {
      await onUpdate(model.id, formData)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const handleEditSubmit = async (formData: FormData) => {
    setRowError('')
    try {
      await onUpdate(model.id, formData)
      setEditing(false)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${model.firstName}? This removes their photos permanently.`)) return
    setRowError('')
    try {
      await onDelete(model.id)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  return (
    <div className={cardClass}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {cover ? <img src={cover} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl text-white">{model.firstName}</p>
          <p className="mt-1 text-sm text-white/50">
            {model.height} · {model.hairColor} hair · {model.eyeColor} eyes · {model.images.length} photo
            {model.images.length === 1 ? '' : 's'}
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
          <input type="checkbox" checked={model.featured} onChange={toggleFeatured} disabled={busy} className="h-5 w-5 rounded accent-pomelo-blue" />
          Featured
        </label>
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

      {rowError && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-400">
          {rowError}
        </p>
      )}

      {editing && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <ModelForm mode="edit" initial={model} submitting={busy} onSubmit={handleEditSubmit} onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  )
}

export default function RosterSection() {
  const { getToken } = useAuth()
  const [models, setModels] = useState<TalentModel[]>([])
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
      setModels(await fetchModels(false))
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Could not load talent.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const handleCreate = async (formData: FormData) => {
    setCreating(true)
    setCreateError('')
    try {
      const token = await getToken()
      const model = await createModel(token, formData)
      setModels((prev) => [...prev, model].sort((a, b) => a.order - b.order))
      setShowAdd(false)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not add the model.')
    } finally {
      setCreating(false)
    }
  }

  const handleUpdate = async (id: string, formData: FormData) => {
    setBusyId(id)
    try {
      const token = await getToken()
      const updated = await updateModel(token, id, formData)
      setModels((prev) => prev.map((m) => (m.id === id ? updated : m)))
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    try {
      const token = await getToken()
      await deleteModel(token, id)
      setModels((prev) => prev.filter((m) => m.id !== id))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">{models.length} in roster</p>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20"
        >
          {showAdd ? 'Close' : '+ Add talent'}
        </button>
      </div>

      {showAdd && (
        <div className={`${cardClass} mb-8`}>
          <h2 className="mb-6 font-display text-2xl text-white">New talent</h2>
          <ModelForm mode="create" submitting={creating} error={createError} onSubmit={handleCreate} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading roster…</p>
      ) : listError ? (
        <div className={cardClass}>
          <p className="text-red-400">{listError}</p>
          <button type="button" onClick={() => void load()} className="mt-3 text-sm font-semibold text-pomelo-blue">
            Retry
          </button>
        </div>
      ) : models.length === 0 ? (
        <div className={cardClass}>
          <p className="text-white/60">No talent yet. Click “Add talent” to create the first profile.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {models.map((model) => (
            <ModelRow key={model.id} model={model} onUpdate={handleUpdate} onDelete={handleDelete} busy={busyId === model.id} />
          ))}
        </div>
      )}
    </div>
  )
}
