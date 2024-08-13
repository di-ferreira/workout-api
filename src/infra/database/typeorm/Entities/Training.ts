import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { iSeries } from '../../../../core/Entities/iSerie';
import { iTraining } from '../../../../core/Entities/iTraining';
import SeriesEntity from './Series';

@Entity('training')
class TrainingEntity implements iTraining {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @OneToMany(() => SeriesEntity, (serie) => serie.training, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  series!: iSeries[];
}

export default TrainingEntity;
