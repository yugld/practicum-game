import { BaseAPI } from './BaseApi'
import { ChangePasswordData, IUser, TUserOmit } from './types'

class UserApi extends BaseAPI {
  public getUser = () => this.api.get<IUser>('/auth/user')

  public editUser = (data: TUserOmit) =>
    this.api.put<IUser>('/user/profile', data)

  public editPassword = (data: ChangePasswordData) =>
    this.api.put('/user/password', data)

  public logOut = () => this.api.post('/auth/logout', {})

  public getAvatar = (url: string) =>
    this.api.get<Blob>(`/resources/${url}`, { responseType: 'blob' })

  public editAvatar = (avatar: Blob) => {
    const data = new FormData()
    data.append('avatar', avatar)
    return this.api.put('/user/profile/avatar', data)
  }

  public async searchUsersByLogin(login: string): Promise<Array<IUser>> {
    const response = await this.api.post('/user/search', { login })
    return response.data;
  }
}

export const userApi = new UserApi()
