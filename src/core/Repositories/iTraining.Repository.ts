import { iList, SearchParams } from '../../@types/workout';
import { iTraining } from '../Entities/iTraining';
import { iUser } from '../Entities/iUser';

export interface iTrainingRepository {
  findById(id: number): Promise<iTraining | null>;

  findAll(params?: SearchParams): Promise<iList<iTraining>>;

  findByUser(user: iUser): Promise<iTraining[]>;

  findByName(trainingName: string): Promise<iTraining[]>;

  createTraining(training: iTraining): Promise<iTraining>;

  saveTraining(training: iTraining): Promise<iTraining>;

  deleteTraining(training: iTraining): Promise<void>;
}
