import { iImageExercise } from '@/core/Entities/iImageExercise';
import { iMuscleGroup } from '@/core/Entities/iMuscleGroup';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { iEquipment } from '../../../../core/Entities/iEquipment';
import { iExercise } from '../../../../core/Entities/iExercise';
import EquipmentEntity from './Equipment';
import ImageExerciseEntity from './ImageExercise';
import MuscleGroupEntity from './MuscleGroup';

@Entity('exercise')
class ExerciseEntity implements iExercise {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  instructions!: string;

  @Column({ type: 'text' })
  tips!: string;

  @OneToMany(
    () => ImageExerciseEntity,
    (imageExercise) => imageExercise.exercise,
    { cascade: true }
  )
  images!: iImageExercise[];

  @ManyToMany(() => ExerciseEntity, { cascade: ['insert'] })
  @JoinTable()
  substitutes!: iExercise[];

  @ManyToMany(() => MuscleGroupEntity, { cascade: ['insert'] })
  @JoinTable()
  muscle_group!: iMuscleGroup[];

  @ManyToMany(() => EquipmentEntity, { cascade: ['insert'] })
  @JoinTable()
  equipment!: iEquipment[];
}

export default ExerciseEntity;
