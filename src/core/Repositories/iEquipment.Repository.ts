import { iCreateEquipment, iEquipment } from '../Entities/iEquipment';

export interface iEquipmentRepository {
  findAll(params?: SearchParams): Promise<iList<iEquipment>>;

  findById(id: number): Promise<iEquipment | null>;

  findByName(params: iCreateEquipment): Promise<iEquipment[]>;

  createEquipment(equipment: iEquipment): Promise<iEquipment>;

  saveEquipment(equipment: iEquipment): Promise<iEquipment>;

  deleteEquipment(equipment: iEquipment): Promise<void>;
}
