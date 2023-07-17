import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { dbConnect } from './db/init'
import router from './routes/index'
import cookieParser from 'cookie-parser';
import { checkAuthMiddleware, proxyMiddleware } from './middleware/checkAuthMiddleware'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: __dirname + '/./../../.env' })
}

async function startServer() {
  const app = express()

  app.use(cors())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
  app.use(express.json())
  app.use(cookieParser())
  
  app.use('/api/v2', proxyMiddleware())
  app.use('/api/userRating/top', checkAuthMiddleware)
  app.use('/api/theme', checkAuthMiddleware)

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    )
    res.contentType('application/json')

    next()
  })
  app.use(morgan('tiny')).use(router)
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/api', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.contentType('application/json')
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

dbConnect().then(async () => startServer())
