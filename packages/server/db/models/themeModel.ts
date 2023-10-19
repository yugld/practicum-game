import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface Theme {
  id: number
  value: string
}

export const themeModel: ModelAttributes<Model, Theme> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataType.STRING,
    allowNull: false,
  },
}
