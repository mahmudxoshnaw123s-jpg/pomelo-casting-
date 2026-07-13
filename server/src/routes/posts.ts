import { Router } from 'express'
import type { Request, Response } from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { firebaseConfigError, isFirebaseConfigured } from '../config/firebase'
import { requireAdmin } from '../middleware/requireAdmin'
import { createPost, deletePost, listPosts, updatePost } from '../services/posts'
import type { PostInput } from '../services/posts'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed.'))
      return
    }
    cb(null, true)
  },
})

const imageUpload = upload.single('image')

function parseFeatured(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === '1'
}

const fieldValidators = (optional: boolean) => {
  const chain = (name: string, message: string, max: number) => {
    const v = body(name)
    if (optional) return v.optional().trim().isLength({ max }).withMessage(`${message} is too long`)
    return v.trim().notEmpty().withMessage(`${message} is required`).isLength({ max }).withMessage(`${message} is too long`)
  }
  return [
    chain('title', 'Title', 160),
    chain('excerpt', 'Excerpt', 400),
    chain('category', 'Category', 60),
    chain('author', 'Author', 80),
    chain('date', 'Date', 40),
    chain('readTime', 'Read time', 40),
  ]
}

function firstValidationError(req: Request, res: Response): boolean {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg })
    return true
  }
  return false
}

// --- Public: list posts ---
router.get('/', async (req: Request, res: Response) => {
  if (!isFirebaseConfigured()) {
    res.status(503).json({ success: false, message: firebaseConfigError() })
    return
  }
  try {
    const featuredOnly = req.query.featured === 'true'
    res.json({ success: true, posts: await listPosts(featuredOnly) })
  } catch (err) {
    console.error('[posts] list failed', err)
    res.status(500).json({ success: false, message: 'Could not load posts.' })
  }
})

// --- Admin: create a post ---
router.post('/', requireAdmin, imageUpload, fieldValidators(false), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return

  const file = req.file
  if (!file) {
    res.status(400).json({ success: false, message: 'A cover image is required.' })
    return
  }

  const input: PostInput = {
    title: req.body.title,
    excerpt: req.body.excerpt,
    category: req.body.category,
    author: req.body.author,
    date: req.body.date,
    readTime: req.body.readTime,
    featured: parseFeatured(req.body.featured),
  }

  try {
    const post = await createPost(input, { buffer: file.buffer, mimetype: file.mimetype, originalname: file.originalname })
    res.status(201).json({ success: true, post })
  } catch (err) {
    console.error('[posts] create failed', err)
    res.status(500).json({ success: false, message: 'Could not save the post.' })
  }
})

// --- Admin: update a post ---
router.patch('/:id', requireAdmin, imageUpload, fieldValidators(true), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return

  const fields: Partial<PostInput> = {}
  for (const key of ['title', 'excerpt', 'category', 'author', 'date', 'readTime'] as const) {
    if (typeof req.body[key] === 'string') fields[key] = req.body[key]
  }
  if (req.body.featured !== undefined) fields.featured = parseFeatured(req.body.featured)

  const file = req.file
  const removeImage = req.body.removeImage === 'true'

  try {
    const post = await updatePost(String(req.params.id), {
      fields,
      newFile: file ? { buffer: file.buffer, mimetype: file.mimetype, originalname: file.originalname } : undefined,
      removeImage,
    })
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found.' })
      return
    }
    res.json({ success: true, post })
  } catch (err) {
    console.error('[posts] update failed', err)
    res.status(500).json({ success: false, message: 'Could not update the post.' })
  }
})

// --- Admin: delete a post ---
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const ok = await deletePost(String(req.params.id))
    if (!ok) {
      res.status(404).json({ success: false, message: 'Post not found.' })
      return
    }
    res.json({ success: true, message: 'Post deleted.' })
  } catch (err) {
    console.error('[posts] delete failed', err)
    res.status(500).json({ success: false, message: 'Could not delete the post.' })
  }
})

export default router
