import { iTechnic } from '../../Entities/iTechnic';
import { iTechnicRepository } from '../../Repositories/iTechnic.Repository';
export default class UpdateTechnicUseCase {
  private EquipmentRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(technic: iTechnic): Promise<iTechnic> {
    return await this.EquipmentRepository.saveTechnic(technic);
  }
}
