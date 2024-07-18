import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';

export default class FindUserByNameUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(name: string): Promise<iUser[]> {
    return await this.UserRepository.findByName(name);
  }
}
