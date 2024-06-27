import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { iExercise } from '../../../../core/Entities/iExercise';
import { iImageExercise } from '../../../../core/Entities/iImageExercise';
import ExerciseEntity from './Exercise';

@Entity('image_exercise')
class ImageExerciseEntity implements iImageExercise {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  link!: string;

  @ManyToOne(() => ExerciseEntity, (exercise) => exercise.images)
  exercise!: iExercise;
}

export default ImageExerciseEntity;
