import { iEquipment } from '@/core/Entities/iEquipment';
import { iEquipmentRepository } from 'src/core/Repositories/iEquipment.Repository';

export default class FindByIdEquipmentsUseCase {
  private EquipmentRepository: iEquipmentRepository;
  constructor(repository: iEquipmentRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(id: number): Promise<iEquipment | null> {
    return await this.EquipmentRepository.findById(id);
  }
}
