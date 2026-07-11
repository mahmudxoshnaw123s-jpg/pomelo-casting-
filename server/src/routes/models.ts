import { Router } from 'express'
import type { Request, Response } from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { isFirebaseConfigured, firebaseConfigError } from '../config/firebase'
import { requireAdmin } from '../middleware/requireAdmin'
import { createModel, deleteModel, listModels, updateModel } from '../services/models'
import type { ModelInput } from '../types/model'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed.'))
      return
    }
    cb(null, true)
  },
})

const imagesUpload = upload.array('images', 10)

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
    chain('firstName', 'First name', 80),
    chain('height', 'Height', 40),
    chain('hairColor', 'Hair color', 60),
    chain('eyeColor', 'Eye color', 60),
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

// --- Public: list models (optionally featured only) ---
router.get('/', async (req: Request, res: Response) => {
  if (!isFirebaseConfigured()) {
    res.status(503).json({ success: false, message: firebaseConfigError() })
    return
  }
  try {
    const featuredOnly = req.query.featured === 'true'
    const models = await listModels(featuredOnly)
    res.json({ success: true, models })
  } catch (err) {
    console.error('[models] list failed', err)
    res.status(500).json({ success: false, message: 'Could not load talent.' })
  }
})

// --- Admin: create a model ---
router.post('/', requireAdmin, imagesUpload, fieldValidators(false), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return

  const files = (req.files as Express.Multer.File[] | undefined) ?? []
  if (files.length === 0) {
    res.status(400).json({ success: false, message: 'At least one photo is required.' })
    return
  }

  const input: ModelInput = {
    firstName: req.body.firstName,
    height: req.body.height,
    hairColor: req.body.hairColor,
    eyeColor: req.body.eyeColor,
    featured: parseFeatured(req.body.featured),
  }

  try {
    const model = await createModel(
      input,
      files.map((f) => ({ buffer: f.buffer, mimetype: f.mimetype, originalname: f.originalname })),
    )
    res.status(201).json({ success: true, model })
  } catch (err) {
    console.error('[models] create failed', err)
    res.status(500).json({ success: false, message: 'Could not save the model.' })
  }
})

// --- Admin: update a model (fields, toggle featured, add/remove photos) ---
router.patch('/:id', requireAdmin, imagesUpload, fieldValidators(true), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return

  const files = (req.files as Express.Multer.File[] | undefined) ?? []

  let removeImagePaths: string[] = []
  if (typeof req.body.removeImagePaths === 'string' && req.body.removeImagePaths.trim()) {
    try {
      const parsed = JSON.parse(req.body.removeImagePaths)
      if (Array.isArray(parsed)) removeImagePaths = parsed.filter((p) => typeof p === 'string')
    } catch {
      res.status(400).json({ success: false, message: 'Invalid removeImagePaths.' })
      return
    }
  }

  const fields: Partial<ModelInput> = {}
  for (const key of ['firstName', 'height', 'hairColor', 'eyeColor'] as const) {
    if (typeof req.body[key] === 'string') fields[key] = req.body[key]
  }
  if (req.body.featured !== undefined) fields.featured = parseFeatured(req.body.featured)

  try {
    const model = await updateModel(String(req.params.id), {
      fields,
      newFiles: files.map((f) => ({ buffer: f.buffer, mimetype: f.mimetype, originalname: f.originalname })),
      removeImagePaths,
    })
    if (!model) {
      res.status(404).json({ success: false, message: 'Model not found.' })
      return
    }
    res.json({ success: true, model })
  } catch (err) {
    console.error('[models] update failed', err)
    res.status(500).json({ success: false, message: 'Could not update the model.' })
  }
})

// --- Admin: delete a model ---
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const ok = await deleteModel(String(req.params.id))
    if (!ok) {
      res.status(404).json({ success: false, message: 'Model not found.' })
      return
    }
    res.json({ success: true, message: 'Model deleted.' })
  } catch (err) {
    console.error('[models] delete failed', err)
    res.status(500).json({ success: false, message: 'Could not delete the model.' })
  }
})

export default router
