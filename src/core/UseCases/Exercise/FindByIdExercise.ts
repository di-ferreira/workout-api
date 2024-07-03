import { iExercise } from '../../Entities/iExercise';
import { iExerciseRepository } from '../../Repositories/iExercise.Repository';

export default class FindByIdExerciseUseCase {
  private exerciseRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciseRepository = repository;
  }

  async execute(id: number): Promise<iExercise | null> {
    return await this.exerciseRepository.findById(id);
  }
}
