import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';
export default class RemoveUserUseCase {
  private UserRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.UserRepository = repository;
  }

  async execute(user: iUser): Promise<void> {
    return await this.UserRepository.deleteUser(user);
  }
}
