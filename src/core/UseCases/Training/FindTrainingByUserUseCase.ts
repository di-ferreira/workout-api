import { iTraining } from '../../Entities/iTraining';
import { iUser } from '../../Entities/iUser';
import { iTrainingRepository } from '../../Repositories/iTraining.Repository';

export default class FindTrainingByUserUseCase {
  private trainingRepository: iTrainingRepository;
  constructor(repository: iTrainingRepository) {
    this.trainingRepository = repository;
  }

  async execute(user: iUser): Promise<iTraining[]> {
    return await this.trainingRepository.findByUser(user);
  }
}
