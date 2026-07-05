import { Router } from 'express'
import type { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { sendContactNotification } from '../services/mailer'

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
})

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).trim().isLength({ max: 40 }).withMessage('Phone number looks too long'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 160 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
]

router.post('/', contactLimiter, validators, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg })
    return
  }

  const { name, email, phone, subject, message } = req.body as {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }

  try {
    await sendContactNotification({ name, email, phone, subject, message })
    res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error('[contact] failed to send notification', err)
    res.status(502).json({ success: false, message: 'Failed to send message. Please try again later.' })
  }
})

export default router
