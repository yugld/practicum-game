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

export type TUserOmit = Omit<IUser, 'id' | 'avatar'>
