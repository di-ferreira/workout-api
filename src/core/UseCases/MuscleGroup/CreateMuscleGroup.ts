import { iMuscleGroup } from '@/core/Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';

export default class UseCaseCreateMuscleGroup {
  constructor(public repository: iMuscleGroupRepository) {}
  async execute(muscleGroup: iMuscleGroup): Promise<iMuscleGroup> {
    return await this.repository.createMuscleGroup(muscleGroup);
  }
}
