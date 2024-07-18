import { iTraining } from '../../Entities/iTraining';
import { iTrainingRepository } from '../../Repositories/iTraining.Repository';

export default class FindTrainingByIdUseCase {
  private trainingRepository: iTrainingRepository;
  constructor(repository: iTrainingRepository) {
    this.trainingRepository = repository;
  }

  async execute(id: number): Promise<iTraining | null> {
    return await this.trainingRepository.findById(id);
  }
}
