import { iTraining } from '../../Entities/iTraining';
import { iTrainingRepository } from '../../Repositories/iTraining.Repository';

export default class RemoveTrainingUseCase {
  private TrainingRepository: iTrainingRepository;
  constructor(repository: iTrainingRepository) {
    this.TrainingRepository = repository;
  }

  async execute(training: iTraining): Promise<void> {
    return await this.TrainingRepository.deleteTraining(training);
  }
}
