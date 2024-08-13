import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { iSeries, iSet } from '../../../../core/Entities/iSerie';
import SeriesEntity from './Series';

@Entity('set')
class SetEntity implements iSet {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'int' })
  weight?: number;

  @Column({ type: 'int' })
  reps?: number;

  @Column({ type: 'int' })
  rest?: number;

  @ManyToOne(() => SeriesEntity, (serie) => serie.sets, {
    onDelete: 'CASCADE',
  })
  serie!: iSeries;
}

export default SetEntity;
