import { iEquipment } from './iEquipment';
import { iImageExercise } from './iImageExercise';
import { iMuscleGroup } from './iMuscleGroup';

export interface iCreateExercise {
  name: string;
  description: string;
  instructions: string;
  tips: string;
  muscle_group: iMuscleGroup[];
  equipment: iEquipment[];
  images: iImageExercise[];
  substitutes: iExercise[];
}

export interface iExercise extends iCreateExercise {
  id: number;
}
