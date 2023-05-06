import { authApi } from "../api/authApi";

type LoginPayload = {
    login: string;
    password: string;
};

type RegisterPayload = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export const login = async (data: LoginPayload) => {
    return authApi
        .login(data)
        .then(() => {
            return Promise.resolve;
        })
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
};

export const registration = async (data: RegisterPayload) => {
    return authApi
        .registration(data)
        .then(() => {
            return Promise.resolve;
        })
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
}