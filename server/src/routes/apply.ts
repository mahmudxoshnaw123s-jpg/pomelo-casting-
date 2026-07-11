import { Router } from 'express'
import type { Request, Response } from 'express'
import multer from 'multer'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { isFirebaseConfigured, firebaseConfigError } from '../config/firebase'
import { saveApplication } from '../services/submissions'

const router = Router()

const applyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 6 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed.'))
      return
    }
    cb(null, true)
  },
})

const photoFields = upload.fields([
  { name: 'fullBody', maxCount: 1 },
  { name: 'mediumShot', maxCount: 1 },
  { name: 'closeUp', maxCount: 1 },
  { name: 'additional', maxCount: 3 },
])

const validators = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 120 }),
  body('age').trim().notEmpty().withMessage('Age is required').isInt({ min: 14, max: 90 }).withMessage('Enter a valid age'),
  body('phone').trim().notEmpty().withMessage('Phone number is required').isLength({ max: 40 }),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('height').trim().notEmpty().withMessage('Height is required').isLength({ max: 40 }),
  body('weight').trim().notEmpty().withMessage('Weight is required').isLength({ max: 40 }),
  body('hairColor').trim().notEmpty().withMessage('Hair color is required').isLength({ max: 60 }),
  body('eyeColor').trim().notEmpty().withMessage('Eye color is required').isLength({ max: 60 }),
  body('shoeSize').trim().notEmpty().withMessage('Shoe size is required').isLength({ max: 20 }),
  body('shirtSize').trim().notEmpty().withMessage('Shirt size is required').isLength({ max: 20 }),
  body('languages').trim().notEmpty().withMessage('Languages spoken is required').isLength({ max: 200 }),
]

router.post('/', applyLimiter, photoFields, validators, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg })
    return
  }

  if (!isFirebaseConfigured()) {
    console.error('[apply]', firebaseConfigError())
    res.status(503).json({ success: false, message: 'Applications are temporarily unavailable. Please try again later.' })
    return
  }

  const files = req.files as Record<string, Express.Multer.File[]> | undefined
  const fullBody = files?.fullBody?.[0]
  const mediumShot = files?.mediumShot?.[0]
  const closeUp = files?.closeUp?.[0]
  const additional = files?.additional ?? []

  if (!fullBody || !mediumShot || !closeUp) {
    res.status(400).json({ success: false, message: 'Full body, medium shot, and close-up photos are required.' })
    return
  }

  const {
    fullName,
    age,
    phone,
    email,
    height,
    weight,
    hairColor,
    eyeColor,
    shoeSize,
    shirtSize,
    languages,
  } = req.body as Record<string, string>

  const photoGroups = [
    { file: fullBody, label: 'full-body' },
    { file: mediumShot, label: 'medium-shot' },
    { file: closeUp, label: 'close-up' },
    ...additional.map((file, i) => ({ file, label: `additional-${i + 1}` })),
  ].map(({ file, label }) => ({
    file: { buffer: file.buffer, mimetype: file.mimetype, originalname: file.originalname },
    label,
  }))

  try {
    await saveApplication(
      { fullName, age, phone, email, height, weight, hairColor, eyeColor, shoeSize, shirtSize, languages },
      photoGroups,
    )
    res.status(200).json({ success: true, message: 'Application submitted successfully.' })
  } catch (err) {
    console.error('[apply] failed to save application', err)
    res.status(500).json({ success: false, message: 'Failed to submit application. Please try again later.' })
  }
})

export default router
