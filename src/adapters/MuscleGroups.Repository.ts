import { Repository } from 'typeorm';
import {
  iCreateMuscleGroup,
  iMuscleGroup,
} from '../core/Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../core/Repositories/iMuscleGroup.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import MuscleGroupEntity from '../infra/database/typeorm/Entities/MuscleGroup';

export class MuscleGroupRepository implements iMuscleGroupRepository {
  private CustomRepository: Repository<MuscleGroupEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(MuscleGroupEntity);
  }

  async findAll({ page, limit }: SearchParams): Promise<iList<iMuscleGroup>> {
    const queryPage: number = page ? page : 1;
    const queryLimit: number = limit ? limit : 10;

    const [equipment, count] = await this.CustomRepository.createQueryBuilder()
      .skip(queryLimit * (queryPage - 1))
      .take(queryLimit)
      .getManyAndCount();

    const result: iList<iMuscleGroup> = {
      current_page: queryPage,
      data: equipment,
      per_page: queryLimit,
      total_registers: count,
    };

    return result;
  }

  async findById(id: number): Promise<iMuscleGroup | null> {
    return await this.CustomRepository.findOneBy({ id });
  }

  async saveMuscleGroup(muscleGroup: iMuscleGroup): Promise<iMuscleGroup> {
    const result = await this.CustomRepository.save({
      id: muscleGroup.id,
      name: muscleGroup.name,
      description_name: muscleGroup.description_name,
    });
    return result;
  }

  async deleteMuscleGroup(muscleGroup: iMuscleGroup): Promise<void> {
    await this.CustomRepository.delete(muscleGroup.id);
  }

  async findByName({
    name,
    description_name,
  }: iCreateMuscleGroup): Promise<iMuscleGroup[]> {
    return await this.CustomRepository.findBy([{ name }, { description_name }]);
  }

  async createMuscleGroup(muscleGroup: iMuscleGroup): Promise<iMuscleGroup> {
    const newMuscleGroup = this.CustomRepository.create({
      name: muscleGroup.name,
      description_name: muscleGroup.description_name,
    });
    const result = await this.CustomRepository.save(newMuscleGroup);
    return result;
  }
}
