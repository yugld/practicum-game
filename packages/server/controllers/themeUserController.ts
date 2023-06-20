import {
  getThemeUserByUserId,
  createThemeUser,
  updateThemeUser,
  getThemeById,
  createTheme,
} from '../db/index'
import { Request, Response } from 'express'
import { ThemeUser } from '../db/models/themeUserModel'

async function getThemeValue(themeUser: ThemeUser) {
  let theme = await getThemeById(themeUser.themeId)
  if (!theme) {
    await createTheme('light')
    await createTheme('dark')
  }

  theme = await getThemeById(themeUser.themeId)
  return theme
}

export async function update(request: Request, response: Response) {
  const userId = +request.params.userId
  const newThemeValue = +request.body.value

  const updateTheme = await updateThemeUser(userId, newThemeValue)

  const themeUser = await getThemeUserByUserId(userId)

  console.log(updateTheme)
  console.log(themeUser)
  const newTheme = await getThemeValue(themeUser?.dataValues)
  return response.json(newTheme)
}

export async function get(request: Request, response: Response) {
  const userId = +request.params.userId

  let themeUser = await getThemeUserByUserId(userId)

  if (!themeUser) {
    themeUser = await createThemeUser(userId)
  }
  const newTheme = await getThemeValue(themeUser.dataValues)
  return response.json(newTheme)
}
