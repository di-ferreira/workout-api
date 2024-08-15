import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { iTraining } from '../../../../core/Entities/iTraining';
import { aUserRole, iUser, iUserRole } from '../../../../core/Entities/iUser';
import TrainingEntity from './Training';

@Entity('user')
class UserEntity implements iUser {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  // @Column({ type: 'enum', enum: aUserRole, default: ['user'], length: 150 })
  @Column({ type: 'varchar', enum: aUserRole, default: 'user', length: 150 })
  role!: iUserRole;

  @ManyToMany(() => TrainingEntity, { cascade: ['insert', 'update', 'remove'] })
  @JoinTable()
  trainings!: iTraining[];
}

export default UserEntity;
