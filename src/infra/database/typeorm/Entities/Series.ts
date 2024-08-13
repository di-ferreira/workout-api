import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { iExercise } from '../../../../core/Entities/iExercise';
import { iSeries, iSet } from '../../../../core/Entities/iSerie';
import { iTechnic } from '../../../../core/Entities/iTechnic';
import { iTraining } from '../../../../core/Entities/iTraining';
import ExerciseEntity from './Exercise';
import SetEntity from './Sets';
import TechnicEntity from './Technic';
import TrainingEntity from './Training';

@Entity('serie')
class SeriesEntity implements iSeries {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToMany(() => ExerciseEntity)
  @JoinTable()
  exercise!: iExercise[];

  @Column({ type: 'int' })
  maximum_reps!: number;

  @Column({ type: 'int' })
  minimum_reps!: number;

  @ManyToMany(() => TechnicEntity)
  @JoinTable()
  technics!: iTechnic[];

  @OneToMany(() => SetEntity, (set) => set.serie, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  sets!: iSet[];

  @ManyToOne(() => TrainingEntity, (training) => training.series, {
    onDelete: 'CASCADE',
  })
  training!: iTraining;
}

export default SeriesEntity;
