import { iEquipment } from '@/core/Entities/iEquipment';
import { iEquipmentRepository } from 'src/core/Repositories/iEquipment.Repository';

export default class DeleteEquipmentsUseCase {
  private EquipmentRepository: iEquipmentRepository;
  constructor(repository: iEquipmentRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(equipment: iEquipment): Promise<void> {
    return await this.EquipmentRepository.deleteEquipment(equipment);
  }
}
