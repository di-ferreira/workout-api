import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { iTechnic } from '../../../../core/Entities/iTechnic';

@Entity('technic')
class TechnicEntity implements iTechnic {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  description!: string;
}

export default TechnicEntity;
