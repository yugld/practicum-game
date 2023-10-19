import { UserRating, ThemeUser, Theme } from './init'

export async function getUserRating(userId: number) {
  return UserRating.findOne({ where: { userId } })
}

export async function getTopFiveUsers() {
  return UserRating.findAll({
    limit: 5,
    order: [['winCount', 'DESC']],
  })
}

export async function createUserRating(userId: number) {
  return UserRating.create({ userId, winCount: 1 })
}

export async function updateUserRating(userId: number) {
  return UserRating.increment('winCount', { where: { userId } })
}

export async function createThemeUser(userId: number) {
  return ThemeUser.create({ userId, themeId: 1 })
}

export async function updateThemeUser(userId: number, themeId: number) {
  return ThemeUser.update({ themeId }, { where: { userId } })
}

export async function getThemeUserByUserId(userId: number) {
  return ThemeUser.findOne({ where: { userId } })
}
export async function getThemeById(id: number) {
  return Theme.findOne({ where: { id } })
}
export async function createTheme(value: string) {
  return Theme.create({ value })
}
