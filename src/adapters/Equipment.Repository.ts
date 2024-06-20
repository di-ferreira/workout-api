import { Repository } from 'typeorm';
import { iCreateEquipment, iEquipment } from '../core/Entities/iEquipment';
import { iEquipmentRepository } from '../core/Repositories/iEquipment.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import Equipment from '../infra/database/typeorm/Entities/Equipment';

export class EquipmentRepository implements iEquipmentRepository {
  private CustomRepository: Repository<Equipment>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(Equipment);
  }

  async findByName({
    name,
    description_name,
  }: iCreateEquipment): Promise<iEquipment[]> {
    return await this.CustomRepository.findBy([{ name }, { description_name }]);
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

  async findById(id: number): Promise<iEquipment | null> {
    return await this.CustomRepository.findOneBy({ id });
  }

  async createEquipment(equipment: iEquipment): Promise<iEquipment> {
    const newEquipment = this.CustomRepository.create({
      name: equipment.name,
      description_name: equipment.description_name,
    });
    const result = await this.CustomRepository.save(newEquipment);
    return result;
  }

  async saveEquipment(equipment: iEquipment): Promise<iEquipment> {
    const result = await this.CustomRepository.save({
      id: equipment.id!,
      name: equipment.name,
      description_name: equipment.description_name,
    });
    return result;
  }

  async deleteEquipment(equipment: iEquipment): Promise<void> {
    await this.CustomRepository.delete(equipment.id!);
  }
}
