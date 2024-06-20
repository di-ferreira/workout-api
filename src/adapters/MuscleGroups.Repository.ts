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
