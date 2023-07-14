import { IUser } from '../../../Interfaces/users/IUser';

export const userMock: IUser = {
  id: 1,
  username: 'fakeuser',
  role: 'admin',
  email: 'valid@email.com',
  password: 'valid-password',
}

export const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc";
