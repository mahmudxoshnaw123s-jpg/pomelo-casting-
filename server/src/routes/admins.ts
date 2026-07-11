import { Router } from 'express'
import type { Response } from 'express'
import { body, validationResult } from 'express-validator'
import { requireAdmin } from '../middleware/requireAdmin'
import type { AdminRequest } from '../middleware/requireAdmin'
import { createAdmin, deleteAdmin, getAdminEmail, listAdmins } from '../services/admins'
import { env } from '../config/env'

const router = Router()

router.use(requireAdmin)

router.get('/', async (_req: AdminRequest, res: Response) => {
  try {
    res.json({ success: true, admins: await listAdmins() })
  } catch (err) {
    console.error('[admins] list failed', err)
    res.status(500).json({ success: false, message: 'Could not load admins.' })
  }
})

const createValidators = [
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('displayName').optional({ values: 'falsy' }).trim().isLength({ max: 120 }),
]

router.post('/', createValidators, async (req: AdminRequest, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg })
    return
  }

  const { email, password, displayName } = req.body as { email: string; password: string; displayName?: string }
  try {
    const admin = await createAdmin(email, password, displayName)
    res.status(201).json({ success: true, admin })
  } catch (err) {
    const code = (err as { code?: string })?.code ?? ''
    if (code === 'auth/email-already-exists') {
      res.status(409).json({ success: false, message: 'An account with that email already exists.' })
      return
    }
    if (code === 'auth/invalid-password') {
      res.status(400).json({ success: false, message: 'Password is too weak (min 6 characters).' })
      return
    }
    if (code === 'auth/invalid-email') {
      res.status(400).json({ success: false, message: 'That email address is invalid.' })
      return
    }
    console.error('[admins] create failed', err)
    res.status(500).json({ success: false, message: 'Could not create the admin.' })
  }
})

router.delete('/:uid', async (req: AdminRequest, res: Response) => {
  const uid = String(req.params.uid)

  if (uid === req.admin?.uid) {
    res.status(400).json({ success: false, message: 'You cannot remove your own account.' })
    return
  }

  const email = await getAdminEmail(uid)
  if (email === null) {
    res.status(404).json({ success: false, message: 'Admin not found.' })
    return
  }
  if (env.adminEmails.includes(email.toLowerCase())) {
    res.status(400).json({ success: false, message: 'This is an owner account managed in server config and cannot be removed here.' })
    return
  }

  try {
    await deleteAdmin(uid)
    res.json({ success: true, message: 'Admin removed.' })
  } catch (err) {
    console.error('[admins] delete failed', err)
    res.status(500).json({ success: false, message: 'Could not remove the admin.' })
  }
})

export default router
