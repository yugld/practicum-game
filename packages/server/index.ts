import dotenv from 'dotenv'
import cors from 'cors'

import express from 'express'
import morgan from 'morgan'
import { dbConnect } from './db/init'
import router from './routes/index'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({path:__dirname + '/./../../.env'});
}


async function startServer() {
  const app = express()
  app.use(cors());
  app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
  });
  app.use(morgan('tiny')).use(router)
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

dbConnect().then(async () => startServer());
