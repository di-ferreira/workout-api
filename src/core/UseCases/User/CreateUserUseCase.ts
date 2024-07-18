import { iUser } from '../../Entities/iUser';
import { iUserRepository } from '../../Repositories/iUser.repository';

export default class CreateUserUseCase {
  private technicRepository: iUserRepository;
  constructor(repository: iUserRepository) {
    this.technicRepository = repository;
  }

  async execute(user: iUser): Promise<iUser> {
    return await this.technicRepository.createUser(user);
  }
}
