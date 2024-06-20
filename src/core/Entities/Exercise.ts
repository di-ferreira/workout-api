import { iEquipment } from './iEquipment';
import { iImageExercise } from './ImageExercise';
import { iMuscleGroup } from './iMuscleGroup';

export interface iExercise {
  id: number | null;
  name: string;
  description: string;
  instructions: string;
  tips: string;
  muscle_group: iMuscleGroup[];
  equipment: iEquipment[];
  images: iImageExercise[];
  substitutes: iExercise[];
}

export class Exercise implements iExercise {
  constructor(
    public id: number | null = null,
    public name: string,
    public description: string,
    public instructions: string,
    public tips: string,
    public muscle_group: iMuscleGroup[] = [],
    public equipment: iEquipment[] = [],
    public images: iImageExercise[],
    public substitutes: iExercise[] = []
  ) {}
}
