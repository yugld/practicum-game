import { BaseAPI } from './BaseApi'
import { ChangePasswordData, IUser, TUserOmit } from './types'

class UserApi extends BaseAPI {
  public constructor() {
    super('https://ya-praktikum.tech/api/v2')
  }

  public getUser = () => this.instance.get<IUser>('/auth/user')

  public editUser = (data: TUserOmit) =>
    this.instance.put<IUser>('/user/profile', data)

  public editPassword = (data: ChangePasswordData) =>
    this.instance.put('/user/password', data)

  public logOut = () => this.instance.post('/auth/logout', {})

  public getAvatar = (url: string) =>
    this.instance.get<Blob>(`/resources/${url}`, { responseType: 'blob' })

  public editAvatar = (avatar: Blob) => {
    const data = new FormData()
    data.append('avatar', avatar)
    return this.instance.put('/user/profile/avatar', data)
  }
}

export const userApi = new UserApi()
