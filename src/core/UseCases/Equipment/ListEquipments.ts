import { iEquipment } from '@/core/Entities/iEquipment';
import { iEquipmentRepository } from 'src/core/Repositories/iEquipment.Repository';

export default class ListEquipmentsUseCase {
  private EquipmentRepository: iEquipmentRepository;
  constructor(repository: iEquipmentRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iEquipment>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.EquipmentRepository.findAll({ page, limit });
  }
}
