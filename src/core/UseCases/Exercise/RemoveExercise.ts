import { iExerciseRepository } from '../../Repositories/iExercise.Repository';

export default class RemoveExerciseUseCase {
  private exerciseRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciseRepository = repository;
  }

  async execute(id: number): Promise<void> {
    return await this.exerciseRepository.deleteExercice(id);
  }
}
