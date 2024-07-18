import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';
export default class UpdateUserUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(user: iUser): Promise<iUser> {
    return await this.UserRepository.saveUser(user);
  }
}
