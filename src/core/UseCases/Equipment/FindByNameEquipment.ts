import { iEquipment } from '@/core/Entities/iEquipment';
import { iEquipmentRepository } from 'src/core/Repositories/iEquipment.Repository';

export default class FindByIdEquipmentsUseCase {
  private EquipmentRepository: iEquipmentRepository;
  constructor(repository: iEquipmentRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(name: string): Promise<iEquipment[]> {
    return await this.EquipmentRepository.findByName({
      name: name,
      description_name: name,
    });
  }
}
