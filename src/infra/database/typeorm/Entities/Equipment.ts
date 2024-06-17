import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { iEquipment } from '../../../../core/Entities/Equipment';

@Entity('equipment')
class Equipment implements iEquipment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  description_name!: string;
}

export default Equipment;
