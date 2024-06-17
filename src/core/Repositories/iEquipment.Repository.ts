import { iEquipment } from '../Entities/Equipment';

export interface iEquipmentRepository {
  findAll(params?: SearchParams): Promise<iList<iEquipment>>;

  findById(id: number): Promise<iEquipment | null>;

  findByName(name: string): Promise<iEquipment | null>;

  createEquipment(equipment: iEquipment): Promise<iEquipment>;

  saveEquipment(equipment: iEquipment): Promise<iEquipment>;

  deleteEquipment(equipment: iEquipment): Promise<void>;
}
