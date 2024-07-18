import { iList, SearchParams } from '../../../@types/workout';
import { iTraining } from '../../Entities/iTraining';
import { iTrainingRepository } from '../../Repositories/iTraining.Repository';

export default class ListTrainingUseCase {
  private trainingRepository: iTrainingRepository;
  constructor(repository: iTrainingRepository) {
    this.trainingRepository = repository;
  }

  async execute(params?: SearchParams): Promise<iList<iTraining>> {
    const { page = 1, limit = 10 } = params || {};
    return await this.trainingRepository.findAll({ page, limit });
  }
}
