import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ThemeUser {
  userId: number
  themeId: number
}

export const themeUserModel: ModelAttributes<Model, ThemeUser> = {
  userId: {
    type: DataType.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  },
  themeId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
