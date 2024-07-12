import { iTechnic } from '../../Entities/iTechnic';
import { iTechnicRepository } from '../../Repositories/iTechnic.Repository';

export default class CreateTechnicUseCase {
  private technicRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.technicRepository = repository;
  }

  async execute(technic: iTechnic): Promise<iTechnic> {
    return await this.technicRepository.createTechnic(technic);
  }
}
