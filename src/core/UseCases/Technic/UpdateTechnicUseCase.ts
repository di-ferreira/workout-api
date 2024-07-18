import { iTechnic } from '../../Entities/iTechnic';
import { iTechnicRepository } from '../../Repositories/iTechnic.Repository';
export default class UpdateTechnicUseCase {
  private TechnicRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.TechnicRepository = repository;
  }

  async execute(technic: iTechnic): Promise<iTechnic> {
    return await this.TechnicRepository.saveTechnic(technic);
  }
}
