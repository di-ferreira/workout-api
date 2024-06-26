import { iMuscleGroup } from '../../Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';
export default class UseCaseDeleteMuscleGroup {
  constructor(public repository: iMuscleGroupRepository) {}
  async execute(muscleGroup: iMuscleGroup): Promise<void> {
    await this.repository.deleteMuscleGroup(muscleGroup);
  }
}
