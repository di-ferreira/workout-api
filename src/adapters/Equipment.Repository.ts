import { Repository } from 'typeorm';
import { iEquipment } from '../core/Entities/Equipment';
import { iEquipmentRepository } from '../core/Repositories/iEquipment.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import Equipment from '../infra/database/typeorm/Entities/Equipment';

export class EquipmentRepository implements iEquipmentRepository {
  private CustomRepository: Repository<Equipment>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Equipment);
  }

  async findAll({ page, limit }: SearchParams): Promise<iList<iEquipment>> {
    const queryPage: number = page ? page : 1;
    const queryLimit: number = limit ? limit : 10;

    const [equipment, count] = await this.CustomRepository.createQueryBuilder()
      .skip(queryLimit * (queryPage - 1))
      .take(queryLimit)
      .getManyAndCount();

    const result: iList<iEquipment> = {
      current_page: queryPage,
      data: equipment,
      per_page: queryLimit,
      total_registers: count,
    };

    return result;
  }

  findById(id: number): Promise<iEquipment | null> {
    throw new Error('Method not implemented.');
  }
  createExercice(equipment: iEquipment): Promise<iEquipment> {
    throw new Error('Method not implemented.');
  }
  saveExercice(equipment: iEquipment): Promise<iEquipment> {
    throw new Error('Method not implemented.');
  }
  deleteExercice(equipment: iEquipment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
