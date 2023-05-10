import { userApi } from '../api/userApi';

export const searchUsers = async (login: string) => {
    return userApi
        .searchUsersByLogin(login)
        .then((data) => data)
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
};
