export interface iUser extends iCreateUser {
  id: number;
}

export const aUserRole = ['admin', 'editor', 'user'] as const;

export type iUserRole = (typeof aUserRole)[number];

export interface iCreateUser {
  name: string;
  email: string;
  password: string;
  role: iUserRole;
}
