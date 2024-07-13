import { iList, SearchParams } from '../../../@types/workout';
import { iTechnic } from '../../Entities/iTechnic';
import { iTechnicRepository } from '../../Repositories/iTechnic.Repository';

export default class ListTechnicUseCase {
  private EquipmentRepository: iTechnicRepository;
  constructor(repository: iTechnicRepository) {
    this.EquipmentRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iTechnic>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.EquipmentRepository.findAll({ page, limit });
  }
}
