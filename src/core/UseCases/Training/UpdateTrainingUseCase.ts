import { iTraining } from '../../Entities/iTraining';
import { iTrainingRepository } from '../../Repositories/iTraining.Repository';

export default class UpdateTrainingUseCase {
  private TrainingRepository: iTrainingRepository;
  constructor(repository: iTrainingRepository) {
    this.TrainingRepository = repository;
  }

  async execute(training: iTraining): Promise<iTraining> {
    return await this.TrainingRepository.saveTraining(training);
  }
}
