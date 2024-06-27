import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { iEquipment } from '../../../../core/Entities/iEquipment';

@Entity('equipment')
class EquipmentEntity implements iEquipment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  description_name!: string;
}

export default EquipmentEntity;
