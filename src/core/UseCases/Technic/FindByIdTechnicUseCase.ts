import { iTechnic } from '@/core/Entities/iTechnic';
import { iTechnicRepository } from '@/core/Repositories/iTechnic.Repository';

export default class FindByIdTechnicUseCase {
  private TechnicRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.TechnicRepository = repository;
  }

  async execute(id: number): Promise<iTechnic | null> {
    return await this.TechnicRepository.findById(id);
  }
}
