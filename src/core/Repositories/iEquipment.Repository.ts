import { iEquipment } from '../Entities/Equipment';

export interface iEquipmentRepository {
  findAll(params?: SearchParams): Promise<iList<iEquipment>>;

  findById(id: number): Promise<iEquipment | null>;

  createExercice(equipment: iEquipment): Promise<iEquipment>;

  saveExercice(equipment: iEquipment): Promise<iEquipment>;

  deleteExercice(equipment: iEquipment): Promise<void>;
}
