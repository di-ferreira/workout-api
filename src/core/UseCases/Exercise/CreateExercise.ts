import { iExercise } from '@/core/Entities/iExercise';
import { iExerciseRepository } from '../../Repositories/iExercise.Repository';

export default class CreateExerciseUseCase {
  private exerciceRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciceRepository = repository;
  }

  async execute(Exercise: iExercise): Promise<iExercise> {
    return await this.exerciceRepository.createExercice(Exercise);
  }
}
