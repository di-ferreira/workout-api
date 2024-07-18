import { iSeries } from '../Entities/iSerie';
import { iTraining } from '../Entities/iTraining';

export interface iSerieRepository {
  findById(id: number): Promise<iSeries | null>;

  findByTraining(training: iTraining): Promise<iSeries[]>;

  createSerie(serie: iSeries): Promise<iSeries>;

  saveSerie(serie: iSeries): Promise<iSeries>;

  deleteSerie(serie: iSeries): Promise<void>;
}
