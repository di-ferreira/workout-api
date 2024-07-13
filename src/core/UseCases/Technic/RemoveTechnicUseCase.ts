import { iTechnic } from '../../Entities/iTechnic';
import { iTechnicRepository } from '../../Repositories/iTechnic.Repository';
export default class RemoveTechnicUseCase {
  private TechnicRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.TechnicRepository = repository;
  }

  async execute(technic: iTechnic): Promise<void> {
    return await this.TechnicRepository.deleteTechnic(technic);
  }
}
