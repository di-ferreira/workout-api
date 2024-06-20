import { iCreateMuscleGroup, iMuscleGroup } from '../Entities/iMuscleGroup';

export interface iMuscleGroupRepository {
  //   findAll(params?: SearchParams): Promise<iList<iEquipment>>;

  //   findById(id: number): Promise<iEquipment | null>;

  findByName(params: iCreateMuscleGroup): Promise<iMuscleGroup[]>;

  createMuscleGroup(muscleGroup: iMuscleGroup): Promise<iMuscleGroup>;

  //   saveEquipment(equipment: iEquipment): Promise<iEquipment>;

  //   deleteEquipment(equipment: iEquipment): Promise<void>;
}
