import { BaseAPI } from './BaseApi';
import { IUser, Room } from './types';

class RoomApi extends BaseAPI {
	public async create(title: string): Promise<{id: number}> {
        const response = await this.api.post<{ id: number }>('/chats', { title });
        return response.data;
	}

	public delete(id: number): Promise<void> {
        return this.api.delete('/chats', { data: { chatId: id } });
	}

	public async read(data?: any): Promise<Room[]> {
        const response = await this.api.get('/chats', data);
        
        return response.data;
	}

	public async getUsers(id: number): Promise<Array<IUser & { role: string }>> {
        const response = await this.api.get(`/chats/${id}/users`);
        
        return response.data;
	}

	public addUsers(id: number, users: number[]): Promise<void> {
		return this.api.put('/chats/users', { users, chatId: id });
	}

	public deleteUsers(id: number, users: number[]): Promise<void> {
        return this.api.delete('/chats/users', { data: { users, chatId: id } });
	}

	async getToken(id: number): Promise<string> {
		const response = await this.api.post<{ token: string }>(`/chats/token/${id}`);

		return response.data.token;
	}
}

export const roomApi = new RoomApi()
