import { iEquipment } from 'src/core/Entities/Equipment';
import { iEquipmentRepository } from 'src/core/Repositories/iEquipment.Repository';

export default class UpdateEquipmentsUseCase {
  private EquipmentRepository: iEquipmentRepository;
  constructor(repository: iEquipmentRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(equipment: iEquipment): Promise<iEquipment> {
    return await this.EquipmentRepository.saveEquipment(equipment);
  }
}
