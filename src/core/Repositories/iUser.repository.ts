import { SearchParams, iList } from '../../@types/workout';
import { iUser } from '../Entities/iUser';

export interface iUserRepository {
  findAll(params?: SearchParams): Promise<iList<iUser>>;

  findById(id: number): Promise<iUser | null>;

  findByEmail(email: string): Promise<iUser | null>;

  findByName(name: string): Promise<iUser[]>;

  createUser(user: iUser): Promise<iUser>;

  saveUser(user: iUser): Promise<iUser>;

  deleteUser(user: iUser): Promise<void>;
}
