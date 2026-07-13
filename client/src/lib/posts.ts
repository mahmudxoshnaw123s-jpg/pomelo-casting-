export interface PostImage {
  url: string
  path: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
  image: PostImage | null
  order: number
  createdAt: string | null
}

interface PostsResponse {
  success: boolean
  posts: Post[]
  message?: string
}

interface PostResponse {
  success: boolean
  post: Post
  message?: string
}

export async function fetchPosts(featuredOnly = false): Promise<Post[]> {
  const res = await fetch(`/api/posts${featuredOnly ? '?featured=true' : ''}`)
  const data = (await res.json().catch(() => null)) as PostsResponse | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not load posts.')
  }
  return data.posts
}

async function writePost(method: 'POST' | 'PATCH', path: string, token: string, body: FormData): Promise<Post> {
  const res = await fetch(path, { method, headers: { Authorization: `Bearer ${token}` }, body })
  const data = (await res.json().catch(() => null)) as PostResponse | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Request failed. Please try again.')
  }
  return data.post
}

export function createPost(token: string, formData: FormData): Promise<Post> {
  return writePost('POST', '/api/posts', token, formData)
}

export function updatePost(token: string, id: string, formData: FormData): Promise<Post> {
  return writePost('PATCH', `/api/posts/${id}`, token, formData)
}

export async function deletePost(token: string, id: string): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
  const data = (await res.json().catch(() => null)) as { success: boolean; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not delete the post.')
  }
}
