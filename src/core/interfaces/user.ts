export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: 'user' | 'admin';
  email: string;
  hash: string;
  fullName: string;
}
