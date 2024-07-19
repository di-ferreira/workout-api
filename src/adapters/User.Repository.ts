import { iUser } from '@/core/Entities/iUser';
import { Repository } from 'typeorm';
import { iList, SearchParams } from '../@types/workout';
import { iUserRepository } from '../core/Repositories/iUser.repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import UserEntity from '../infra/database/typeorm/Entities/User';

export class UserRepository implements iUserRepository {
  private CustomRepository: Repository<UserEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(UserEntity);
  }

  findAll(params?: SearchParams): Promise<iList<iUser>> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<iUser | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<iUser | null> {
    return await this.CustomRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  findByName(name: string): Promise<iUser[]> {
    throw new Error('Method not implemented.');
  }

  async createUser(user: iUser): Promise<iUser> {
    const newUser = this.CustomRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    const result = await this.CustomRepository.save(newUser);
    return result;
  }

  saveUser(user: iUser): Promise<iUser> {
    throw new Error('Method not implemented.');
  }
  deleteUser(user: iUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
