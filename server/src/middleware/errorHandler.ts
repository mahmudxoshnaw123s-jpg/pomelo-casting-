import type { NextFunction, Request, Response } from 'express'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: 'Not found' })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error('[error]', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
}
