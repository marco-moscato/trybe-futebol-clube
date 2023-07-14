export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  id: number,
  role: string,
  username: string,
}
