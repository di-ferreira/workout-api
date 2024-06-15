import { iExercise } from '@/core/Entities/Exercise';
import { iExerciceRepository } from '@/core/Repositories/iExercise.Repository';

export default class ListExerciseUseCase {
  private exerciceRepository: iExerciceRepository;
  constructor(repository: iExerciceRepository) {
    this.exerciceRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iExercise>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.exerciceRepository.findAll({ page, limit });
  }
}
