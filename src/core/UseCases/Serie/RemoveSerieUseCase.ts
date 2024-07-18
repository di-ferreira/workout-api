import { iSeries } from '../../Entities/iSerie';
import { iSerieRepository } from '../../Repositories/iSerie.Repository';

export default class RemoveSerieUseCase {
  private SerieRepository: iSerieRepository;
  constructor(repository: iSerieRepository) {
    this.SerieRepository = repository;
  }

  async execute(serie: iSeries): Promise<void> {
    return await this.SerieRepository.deleteSerie(serie);
  }
}
