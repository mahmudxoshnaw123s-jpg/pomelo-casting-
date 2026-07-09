import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env, isProduction } from './config/env'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import applyRouter from './routes/apply'
import contactRouter from './routes/contact'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(
    cors({
      origin: env.clientOrigin,
      methods: ['GET', 'POST'],
    }),
  )
  app.use(express.json({ limit: '10kb' }))
  app.use(morgan(isProduction ? 'combined' : 'dev'))

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'ok' })
  })

  app.use('/api/contact', contactRouter)
  app.use('/api/apply', applyRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
