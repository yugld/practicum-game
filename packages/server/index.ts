import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

import express from 'express'

import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })


  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      const templatePath = isDev() ? srcPath : distPath;

      template = fs.readFileSync(
        path.resolve(templatePath, 'index.html'),
        'utf-8',
      )

      if (isDev()) template = await vite!.transformIndexHtml(url, template)

      let render: (url: string) => Promise<string>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
      }

      const [initialState, appHtml, chunks, styles] = await render(url);
      const stateMarkup = `<script>globalThis.__REDUX_STATE__=${JSON.stringify(initialState)}</script>`; 
      const reduxState = template.replace(`<!--redux-state-->`, stateMarkup);
      const html = reduxState.replace(`<!--ssr-outlet-->`, appHtml);
      const htmlWithStyles = html.replace(`<!--styles-->`, styles);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithStyles)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer();
