import { get, update } from '../controllers/themeUserController'
import { Router } from 'express'

export const themeUserRoutes = (router: Router) => {
  const themeUserRouter = Router()

  themeUserRouter.post('/:userId(\\d+)', update).get('/:userId(\\d+)', get)

  router.use('/api/theme/', themeUserRouter)
}
