import { Router } from 'express'
import type { Request, Response } from 'express'
import { requireAdmin } from '../middleware/requireAdmin'
import {
  deleteApplication,
  deleteContact,
  listApplications,
  listContacts,
  setApplicationRead,
  setContactRead,
} from '../services/submissions'

const router = Router()

router.use(requireAdmin)

// --- Contacts ---
router.get('/contacts', async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, contacts: await listContacts() })
  } catch (err) {
    console.error('[submissions] list contacts failed', err)
    res.status(500).json({ success: false, message: 'Could not load contact messages.' })
  }
})

router.patch('/contacts/:id', async (req: Request, res: Response) => {
  try {
    await setContactRead(String(req.params.id), Boolean(req.body?.read))
    res.json({ success: true })
  } catch (err) {
    console.error('[submissions] update contact failed', err)
    res.status(500).json({ success: false, message: 'Could not update the message.' })
  }
})

router.delete('/contacts/:id', async (req: Request, res: Response) => {
  try {
    await deleteContact(String(req.params.id))
    res.json({ success: true })
  } catch (err) {
    console.error('[submissions] delete contact failed', err)
    res.status(500).json({ success: false, message: 'Could not delete the message.' })
  }
})

// --- Applications ---
router.get('/applications', async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, applications: await listApplications() })
  } catch (err) {
    console.error('[submissions] list applications failed', err)
    res.status(500).json({ success: false, message: 'Could not load applications.' })
  }
})

router.patch('/applications/:id', async (req: Request, res: Response) => {
  try {
    await setApplicationRead(String(req.params.id), Boolean(req.body?.read))
    res.json({ success: true })
  } catch (err) {
    console.error('[submissions] update application failed', err)
    res.status(500).json({ success: false, message: 'Could not update the application.' })
  }
})

router.delete('/applications/:id', async (req: Request, res: Response) => {
  try {
    await deleteApplication(String(req.params.id))
    res.json({ success: true })
  } catch (err) {
    console.error('[submissions] delete application failed', err)
    res.status(500).json({ success: false, message: 'Could not delete the application.' })
  }
})

export default router
