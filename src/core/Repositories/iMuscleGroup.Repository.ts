import { iCreateMuscleGroup, iMuscleGroup } from '../Entities/iMuscleGroup';

export interface iMuscleGroupRepository {
  findAll(params?: SearchParams): Promise<iList<iMuscleGroup>>;

  findById(id: number): Promise<iMuscleGroup | null>;

  findByName(params: iCreateMuscleGroup): Promise<iMuscleGroup[]>;

  createMuscleGroup(muscleGroup: iMuscleGroup): Promise<iMuscleGroup>;

  saveMuscleGroup(muscleGroup: iMuscleGroup): Promise<iMuscleGroup>;

  deleteMuscleGroup(muscleGroup: iMuscleGroup): Promise<void>;
}
