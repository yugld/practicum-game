import { Router } from 'express'
import { userRatingRoutes } from './userRating.route'
import { themeUserRoutes } from './themeUser.route'

const router = Router()

userRatingRoutes(router)
themeUserRoutes(router)
export default router
