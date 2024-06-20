import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { iMuscleGroup } from '../../../../core/Entities/iMuscleGroup';

@Entity('muscle_groups')
class MuscleGroupEntity implements iMuscleGroup {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  description_name!: string;
}

export default MuscleGroupEntity;
