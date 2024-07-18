import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';

export default class FindUserByIdUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(id: number): Promise<iUser | null> {
    return await this.UserRepository.findById(id);
  }
}
