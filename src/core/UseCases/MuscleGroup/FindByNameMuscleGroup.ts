import { iMuscleGroup } from '../../Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';
export default class UseCaseFindNameMuscleGroup {
  private muscleGroupRepository: iMuscleGroupRepository;
  constructor(repository: iMuscleGroupRepository) {
    this.muscleGroupRepository = repository;
  }

  async execute(name: string): Promise<iMuscleGroup[]> {
    return await this.muscleGroupRepository.findByName({
      name: name,
      description_name: name,
    });
  }
}
