import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PostForm from './PostForm'
import { cardClass } from './adminStyles'
import { createPost, deletePost, fetchPosts, updatePost } from '../../lib/posts'
import type { Post } from '../../lib/posts'

function PostRow({
  post,
  onUpdate,
  onDelete,
  busy,
}: {
  post: Post
  onUpdate: (id: string, formData: FormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
  busy: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [rowError, setRowError] = useState('')

  const toggleFeatured = async () => {
    setRowError('')
    const formData = new FormData()
    formData.append('featured', String(!post.featured))
    try {
      await onUpdate(post.id, formData)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const handleEditSubmit = async (formData: FormData) => {
    setRowError('')
    try {
      await onUpdate(post.id, formData)
      setEditing(false)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete “${post.title}”?`)) return
    setRowError('')
    try {
      await onDelete(post.id)
    } catch (err) {
      setRowError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  return (
    <div className={cardClass}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
          {post.image ? <img src={post.image.url} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pomelo-blue/80">{post.category}</p>
          <p className="mt-0.5 font-display text-lg leading-tight text-white">{post.title}</p>
          <p className="mt-1 text-sm text-white/50">
            {post.author} · {post.date} · {post.readTime}
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
          <input type="checkbox" checked={post.featured} onChange={toggleFeatured} disabled={busy} className="h-5 w-5 rounded accent-pomelo-blue" />
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
          <PostForm mode="edit" initial={post} submitting={busy} onSubmit={handleEditSubmit} onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  )
}

export default function InsightsSection() {
  const { getToken } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
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
      setPosts(await fetchPosts(false))
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Could not load posts.')
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
      const post = await createPost(token, formData)
      setPosts((prev) => [post, ...prev])
      setShowAdd(false)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not add the post.')
    } finally {
      setCreating(false)
    }
  }

  const handleUpdate = async (id: string, formData: FormData) => {
    setBusyId(id)
    try {
      const token = await getToken()
      const updated = await updatePost(token, id, formData)
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    try {
      const token = await getToken()
      await deletePost(token, id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">{posts.length} post{posts.length === 1 ? '' : 's'}</p>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pomelo-blue/20"
        >
          {showAdd ? 'Close' : '+ Add post'}
        </button>
      </div>

      {showAdd && (
        <div className={`${cardClass} mb-8`}>
          <h2 className="mb-6 font-display text-2xl text-white">New post</h2>
          <PostForm mode="create" submitting={creating} error={createError} onSubmit={handleCreate} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading posts…</p>
      ) : listError ? (
        <div className={cardClass}>
          <p className="text-red-400">{listError}</p>
          <button type="button" onClick={() => void load()} className="mt-3 text-sm font-semibold text-pomelo-blue">
            Retry
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className={cardClass}>
          <p className="text-white/60">No posts yet. Click “Add post” to publish the first one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} onUpdate={handleUpdate} onDelete={handleDelete} busy={busyId === post.id} />
          ))}
        </div>
      )}
    </div>
  )
}
