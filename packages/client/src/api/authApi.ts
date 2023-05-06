import { BaseAPI } from './BaseApi'
import { RegisterRequestData, LoginRequestData, ResponseData } from './types'

class AuthApi extends BaseAPI {

  public login = (data: LoginRequestData) => this.api.post<ResponseData>('/auth/signin', data);

  public logout = () => this.api.post('/auth/logout');

  public register = (data: RegisterRequestData) =>
    this.api.post<ResponseData>('/user/signup', data);
}

export const authApi = new AuthApi()
