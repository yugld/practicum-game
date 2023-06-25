import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { userRatingModel } from '../models/userRating';

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres'
};

export const sequelize = new Sequelize(sequelizeOptions);

export const UserRating = sequelize.define('UserRating', userRatingModel, {
    timestamps: false,
    freezeTableName: true
});

export async function dbConnect() {
    try {
        await sequelize.authenticate(); // Проверка аутентификации в БД
        await sequelize.sync(); // Синхронизация базы данных
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
