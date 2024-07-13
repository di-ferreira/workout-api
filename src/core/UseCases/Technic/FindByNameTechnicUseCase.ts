import { iTechnic } from '@/core/Entities/iTechnic';
import { iTechnicRepository } from '@/core/Repositories/iTechnic.Repository';

export default class FindByNameTechnicUseCase {
  private EquipmentRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(name: string): Promise<iTechnic[]> {
    return await this.EquipmentRepository.findByName({
      name: name,
      description: name,
    });
  }
}
