import { iExercise } from '../Entities/Exercise';

export interface iExerciceRepository {
  findAll(params?: SearchParams): Promise<iList<iExercise>>;

  findById(id: number): Promise<iExercise | null>;

  createExercice(iExercise: iExercise): Promise<iExercise>;

  saveExercice(iExercise: iExercise): Promise<iExercise>;

  deleteExercice(iExercise: iExercise): Promise<void>;
}
