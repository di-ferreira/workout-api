import { iSeries } from '../../Entities/iSerie';
import { iSerieRepository } from '../../Repositories/iSerie.Repository';

export default class FindSerieByIdUseCase {
  private SerieRepository: iSerieRepository;
  constructor(repository: iSerieRepository) {
    this.SerieRepository = repository;
  }

  async execute(id: number): Promise<iSeries | null> {
    return await this.SerieRepository.findById(id);
  }
}
