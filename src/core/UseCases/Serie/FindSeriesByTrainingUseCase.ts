import { iSeries } from '../../Entities/iSerie';
import { iTraining } from '../../Entities/iTraining';
import { iSerieRepository } from '../../Repositories/iSerie.Repository';

export default class FindSerieByTrainingUseCase {
  private SerieRepository: iSerieRepository;
  constructor(repository: iSerieRepository) {
    this.SerieRepository = repository;
  }

  async execute(training: iTraining): Promise<iSeries[]> {
    return await this.SerieRepository.findByTraining(training);
  }
}
