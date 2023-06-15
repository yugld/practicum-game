import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface UserRating {
    userId: number;
    winCount: number;
}

export const userRatingModel: ModelAttributes<Model, UserRating>= {
    userId: {
        type: DataType.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    winCount: {
        type: DataType.INTEGER,
        allowNull: false,
    }
};
