import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env, isProduction } from './config/env'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import adminsRouter from './routes/admins'
import applyRouter from './routes/apply'
import contactRouter from './routes/contact'
import faqsRouter from './routes/faqs'
import modelsRouter from './routes/models'
import postsRouter from './routes/posts'
import submissionsRouter from './routes/submissions'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(
    cors({
      origin: env.clientOrigin,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  app.use(express.json({ limit: '10kb' }))
  app.use(morgan(isProduction ? 'combined' : 'dev'))

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'ok' })
  })

  app.use('/api/contact', contactRouter)
  app.use('/api/apply', applyRouter)
  app.use('/api/models', modelsRouter)
  app.use('/api/posts', postsRouter)
  app.use('/api/faqs', faqsRouter)
  app.use('/api/admins', adminsRouter)
  app.use('/api/submissions', submissionsRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
