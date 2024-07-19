import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { aUserRole, iUser, iUserRole } from '../../../../core/Entities/iUser';

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
}

export default UserEntity;
