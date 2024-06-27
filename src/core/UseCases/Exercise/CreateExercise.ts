import { iExercise } from '@/core/Entities/iExercise';
import { iExerciceRepository } from 'src/core/Repositories/iExercise.Repository';

export default class CreateExerciseUseCase {
  private exerciceRepository: iExerciceRepository;
  constructor(repository: iExerciceRepository) {
    this.exerciceRepository = repository;
  }

  async execute(Exercise: iExercise): Promise<iExercise> {
    return await this.exerciceRepository.createExercice(Exercise);
  }
}
