import { SearchParams, iList } from '../../@types/workout';
import { iEquipment } from '../Entities/iEquipment';
import { iExercise } from '../Entities/iExercise';
import { iImageExercise } from '../Entities/iImageExercise';
import { iMuscleGroup } from '../Entities/iMuscleGroup';

export interface iExerciceRepository {
  findAll(params?: SearchParams): Promise<iList<iExercise>>;

  findById(id: number): Promise<iExercise | null>;

  createExercice(exercise: iExercise): Promise<iExercise>;

  saveExercice(exercise: iExercise): Promise<iExercise>;

  deleteExercice(exercise: iExercise): Promise<void>;

  addImage(image: iImageExercise | iImageExercise[]): Promise<iExercise>;

  addSubstitute(image: iExercise | iExercise[]): Promise<iExercise>;

  addEquipment(equipment: iEquipment | iEquipment[]): Promise<iExercise>;

  addMuscleGroup(
    muscleGroup: iMuscleGroup | iMuscleGroup[]
  ): Promise<iExercise>;
}
