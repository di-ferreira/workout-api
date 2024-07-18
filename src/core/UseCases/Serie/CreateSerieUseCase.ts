import { iSeries } from '../../Entities/iSerie';
import { iSerieRepository } from '../../Repositories/iSerie.Repository';

export default class CreateSerieUseCase {
  private SerieRepository: iSerieRepository;
  constructor(repository: iSerieRepository) {
    this.SerieRepository = repository;
  }

  async execute(serie: iSeries): Promise<iSeries> {
    return await this.SerieRepository.createSerie(serie);
  }
}
