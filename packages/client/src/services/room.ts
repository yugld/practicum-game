import { roomApi } from '../api/roomApi';

type RoomUsersPayload = {
    id: number;
    users: number[];
};

type RoomListPayload = {
    offset?: number;
    limit?: number;
    title?: string;
}

export const createRoom = async (title: string) => {
    return roomApi
        .create(title)
        .then((data) => data.id)
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
};

export const getRoomList = async (data?: RoomListPayload) => {
    return roomApi
        .read(data)
        .then((data) => data)
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
}

export const deleteRoom = async (id: number) => {
    return roomApi
        .delete(id)
        .then(() => {
            return Promise.resolve;
        })
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
};

export const getRoomUsers = async (id: number) => {
    return roomApi
        .getUsers(id)
        .then((data) => data)
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
}

export const deleteRoomUsers = async ({id, users}: RoomUsersPayload) => {
    return roomApi
        .deleteUsers(id, users)
        .then(() => {
            return Promise.resolve;
        })
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
};

export const addRoomUsers = async ({id, users}: RoomUsersPayload) => {
    return roomApi
        .addUsers(id, users)
        .then(() => {
            return Promise.resolve;
        })
        .catch(({ response }) => {
            return Promise.reject(response?.data?.reason);
        });
}
