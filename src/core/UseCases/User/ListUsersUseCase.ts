import { iList, SearchParams } from '../../../@types/workout';
import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';

export default class ListUsersUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iUser>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.UserRepository.findAll({ page, limit });
  }
}
