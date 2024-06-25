import { iMuscleGroup } from '../../Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';
export default class UseCaseFindByIdMuscleGroup {
  private muscleGroupRepository: iMuscleGroupRepository;
  constructor(repository: iMuscleGroupRepository) {
    this.muscleGroupRepository = repository;
  }

  async execute(id: number): Promise<iMuscleGroup | null> {
    return await this.muscleGroupRepository.findById(id);
  }
}
