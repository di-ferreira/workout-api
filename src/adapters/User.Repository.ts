import { iUser } from '@/core/Entities/iUser';
import { Like, Repository } from 'typeorm';
import { iList, SearchParams } from '../@types/workout';
import { iUserRepository } from '../core/Repositories/iUser.repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import UserEntity from '../infra/database/typeorm/Entities/User';

export class UserRepository implements iUserRepository {
  private CustomRepository: Repository<UserEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(UserEntity);
  }

  async findAll({ page, limit }: SearchParams): Promise<iList<iUser>> {
    const queryPage: number = page ? page : 1;
    const queryLimit: number = limit ? limit : 10;

    const [users, count] = await this.CustomRepository.createQueryBuilder()
      .skip(queryLimit * (queryPage - 1))
      .take(queryLimit)
      .getManyAndCount();

    const result: iList<iUser> = {
      current_page: queryPage,
      data: users,
      per_page: queryLimit,
      total_registers: count,
    };

    return result;
  }

  async findById(id: number): Promise<iUser | null> {
    return await this.CustomRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<iUser | null> {
    return await this.CustomRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByName(name: string): Promise<iUser[]> {
    return await this.CustomRepository.findBy([
      {
        name: Like(`%${name}%`),
      },
    ]);
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

  async saveUser(user: iUser): Promise<iUser> {
    const result = this.CustomRepository.save({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return result;
  }

  async deleteUser(user: iUser): Promise<void> {
    await this.CustomRepository.delete(user.id);
  }
}
