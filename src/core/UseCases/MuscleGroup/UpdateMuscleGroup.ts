import { iMuscleGroup } from '../../Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';

export default class UseCaseUpdateMuscleGroup {
  constructor(public repository: iMuscleGroupRepository) {}
  async execute(muscleGroup: iMuscleGroup): Promise<iMuscleGroup> {
    return await this.repository.saveMuscleGroup(muscleGroup);
  }
}
