export interface iUser extends iCreateUser {
  id: string;
}

export type iUserRole = 'admin' | 'editor' | 'user';

export interface iCreateUser {
  name: string;
  email: string;
  password: string;
  role: iUserRole;
}
