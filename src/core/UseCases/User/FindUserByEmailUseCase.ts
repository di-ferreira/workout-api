import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';

export default class FindUserByEmailUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(email: string): Promise<iUser | null> {
    return await this.UserRepository.findByEmail(email);
  }
}
