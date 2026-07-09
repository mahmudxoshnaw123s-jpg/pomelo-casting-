import type { NextFunction, Request, Response } from 'express'
import multer from 'multer'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: 'Not found' })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'One of your photos is too large (max 8MB each).'
        : err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE'
          ? 'Too many photos submitted.'
          : 'There was a problem uploading your photos.'
    res.status(400).json({ success: false, message })
    return
  }
  if (err instanceof Error && err.message === 'Only image files are allowed.') {
    res.status(400).json({ success: false, message: err.message })
    return
  }

  console.error('[error]', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
}
