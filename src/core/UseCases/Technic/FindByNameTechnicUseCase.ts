import { iTechnic } from '@/core/Entities/iTechnic';
import { iTechnicRepository } from '@/core/Repositories/iTechnic.Repository';

export default class FindByNameTechnicUseCase {
  private technicRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.technicRepository = repository;
  }

  async execute(name: string): Promise<iTechnic[]> {
    return await this.technicRepository.findByName({
      name: name,
      description: name,
    });
  }
}
