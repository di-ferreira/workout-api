import { iExercise } from '../../Entities/iExercise';
import { iExerciseRepository } from '../../Repositories/iExercise.Repository';

export default class FindByNameExerciseUseCase {
  private exerciseRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciseRepository = repository;
  }

  async execute(name: string): Promise<iExercise[]> {
    return await this.exerciseRepository.findByName(name);
  }
}
