import { iExercise } from '../Entities/iExercise';
import { iImageExercise } from '../Entities/iImageExercise';

export interface iImageExerciceRepository {
  findById(id: number): Promise<iImageExercise | null>;

  findByExercise(exercise: iExercise): Promise<iImageExercise | null>;

  countImagesFromExercise(exercise: iExercise): Promise<number>;

  createExercice(imageExercise: iImageExercise): Promise<iImageExercise>;

  saveExercice(imageExercise: iImageExercise): Promise<iImageExercise>;

  deleteImageExercice(imageExercise: iImageExercise): Promise<void>;
}
