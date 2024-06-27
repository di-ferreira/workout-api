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

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'varchar' })
  instructions!: string;

  @Column({ type: 'varchar' })
  tips!: string;

  @OneToMany(
    () => ImageExerciseEntity,
    (imageExercise) => imageExercise.exercise
  )
  images!: iImageExercise[];

  @ManyToMany(() => ExerciseEntity)
  @JoinTable()
  substitutes!: iExercise[];

  @ManyToMany(() => MuscleGroupEntity)
  @JoinTable()
  muscle_group!: iMuscleGroup[];

  @ManyToMany(() => EquipmentEntity)
  @JoinTable()
  equipment!: iEquipment[];
}

export default ExerciseEntity;
