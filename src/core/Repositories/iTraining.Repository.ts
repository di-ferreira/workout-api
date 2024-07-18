import { iList, SearchParams } from '../../@types/workout';
import { iTraining } from '../Entities/iTraining';
import { iUser } from '../Entities/iUser';

export interface iTrainingRepository {
  findById(id: number): Promise<iTraining | null>;

  findAll(params?: SearchParams): Promise<iList<iTraining>>;

  findByUser(user: iUser): Promise<iTraining[]>;

  createTraining(serie: iTraining): Promise<iTraining>;

  saveTraining(serie: iTraining): Promise<iTraining>;

  deleteTraining(serie: iTraining): Promise<void>;
}
