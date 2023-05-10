export interface IUser {
  id?: number
  login: string
  first_name: string
  second_name: string
  display_name?: string
  email: string
  avatar?: string
  phone: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export interface RegisterRequestData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

export interface LoginRequestData {
  login: string,
  password: string,
}

export type APIError = {
  reason: string,
}

export type ResponseData = object | APIError; 

export type TUserOmit = Omit<IUser, 'id' | 'avatar'>
