import 'dotenv/config';
import 'reflect-metadata';
import {
  DataSource,
  DataSourceOptions,
  EntitySchema,
  MixedList,
} from 'typeorm';
import Equipment from './Entities/Equipment';
import MuscleGroup from './Entities/MuscleGroup';

const EntityClasses: MixedList<Function | string | EntitySchema> = [
  Equipment,
  MuscleGroup,
];

let DSConfig: DataSourceOptions;

DSConfig = {
  type: 'better-sqlite3',
  database: process.env.DATABASE_NAME!,
  entities: EntityClasses,
  entitySkipConstructor: true,
  synchronize: true,
  logging: false,
};

if (process.env.NODE_ENV === 'production') {
  DSConfig = {
    type: 'mariadb',
    database: 'workoutDB',
    host: 'localhost',
    password: '',
    port: 3306,
    username: 'root',
    entities: EntityClasses,
    synchronize: true,
  };
}

export const AppDataSource = new DataSource(DSConfig);
