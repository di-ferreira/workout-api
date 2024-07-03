import { iCreateEquipment, iEquipment } from './iEquipment';
import { iCreateImageExercise, iImageExercise } from './iImageExercise';
import { iCreateMuscleGroup, iMuscleGroup } from './iMuscleGroup';

export interface iCreateExercise {
  name: string;
  description?: string;
  instructions?: string;
  tips?: string;
  muscle_group: iMuscleGroup[] | iCreateMuscleGroup[];
  equipment: iEquipment[] | iCreateEquipment[];
  images: iImageExercise[] | iCreateImageExercise[];
  substitutes: iExercise[] | iCreateExercise[];
}

export interface iExercise extends iCreateExercise {
  id: number;
}
