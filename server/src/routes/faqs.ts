import { Router } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { firebaseConfigError, isFirebaseConfigured } from '../config/firebase'
import { requireAdmin } from '../middleware/requireAdmin'
import { createFaq, deleteFaq, listFaqs, updateFaq } from '../services/faqs'
import type { FaqInput } from '../services/faqs'

const router = Router()

const fieldValidators = (optional: boolean) => {
  const req = (name: string, message: string, max: number) =>
    body(name).trim().notEmpty().withMessage(`${message} is required`).isLength({ max }).withMessage(`${message} is too long`)
  const opt = (name: string, message: string, max: number) =>
    body(name).optional().trim().isLength({ max }).withMessage(`${message} is too long`)
  const make = optional ? opt : req
  return [make('question', 'Question', 300), make('answer', 'Answer', 2000), body('category').optional().trim().isLength({ max: 60 })]
}

function firstValidationError(req: Request, res: Response): boolean {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg })
    return true
  }
  return false
}

// --- Public: list FAQs ---
router.get('/', async (_req: Request, res: Response) => {
  if (!isFirebaseConfigured()) {
    res.status(503).json({ success: false, message: firebaseConfigError() })
    return
  }
  try {
    res.json({ success: true, faqs: await listFaqs() })
  } catch (err) {
    console.error('[faqs] list failed', err)
    res.status(500).json({ success: false, message: 'Could not load FAQs.' })
  }
})

// --- Admin: create ---
router.post('/', requireAdmin, fieldValidators(false), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return
  const input: FaqInput = { question: req.body.question, answer: req.body.answer, category: req.body.category ?? '' }
  try {
    res.status(201).json({ success: true, faq: await createFaq(input) })
  } catch (err) {
    console.error('[faqs] create failed', err)
    res.status(500).json({ success: false, message: 'Could not save the FAQ.' })
  }
})

// --- Admin: update ---
router.patch('/:id', requireAdmin, fieldValidators(true), async (req: Request, res: Response) => {
  if (firstValidationError(req, res)) return
  const fields: Partial<FaqInput> = {}
  for (const key of ['question', 'answer', 'category'] as const) {
    if (typeof req.body[key] === 'string') fields[key] = req.body[key]
  }
  try {
    const faq = await updateFaq(String(req.params.id), fields)
    if (!faq) {
      res.status(404).json({ success: false, message: 'FAQ not found.' })
      return
    }
    res.json({ success: true, faq })
  } catch (err) {
    console.error('[faqs] update failed', err)
    res.status(500).json({ success: false, message: 'Could not update the FAQ.' })
  }
})

// --- Admin: delete ---
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const ok = await deleteFaq(String(req.params.id))
    if (!ok) {
      res.status(404).json({ success: false, message: 'FAQ not found.' })
      return
    }
    res.json({ success: true, message: 'FAQ deleted.' })
  } catch (err) {
    console.error('[faqs] delete failed', err)
    res.status(500).json({ success: false, message: 'Could not delete the FAQ.' })
  }
})

export default router
