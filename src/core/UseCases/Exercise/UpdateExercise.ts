import { iExercise } from '../../Entities/iExercise';
import { iExerciseRepository } from '../../Repositories/iExercise.Repository';

export default class UpdateExerciseUseCase {
  private exerciceRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciceRepository = repository;
  }

  async execute(Exercise: iExercise): Promise<iExercise> {
    return await this.exerciceRepository.saveExercice(Exercise);
  }
}
