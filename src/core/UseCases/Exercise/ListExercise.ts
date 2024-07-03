import { iExercise } from '@/core/Entities/iExercise';
import { iExerciseRepository } from 'src/core/Repositories/iExercise.Repository';
import { iList, SearchParams } from '../../../@types/workout';

export default class ListExerciseUseCase {
  private exerciceRepository: iExerciseRepository;
  constructor(repository: iExerciseRepository) {
    this.exerciceRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iExercise>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.exerciceRepository.findAll({ page, limit });
  }
}
