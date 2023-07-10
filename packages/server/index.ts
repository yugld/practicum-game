import dotenv from 'dotenv'
import cors from 'cors'
import express, { NextFunction, Request, Response  } from 'express'
import morgan from 'morgan'
import { dbConnect } from './db/init'
import router from './routes/index'
import cookieParser from 'cookie-parser';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: __dirname + '/./../../.env' })
}

async function startServer() {
  const app = express()

  app.use(cookieParser())

  app.use(cors())
  app.use(express.json())

  const checkAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('checkAuthMiddleware req.cookies.auth: ', req.cookies.auth)
    const Cookie = await req.cookies.auth
    if (Cookie) {
      return next()
    }
    res.redirect('/login')
  }

  app.use('*', checkAuthMiddleware);

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
