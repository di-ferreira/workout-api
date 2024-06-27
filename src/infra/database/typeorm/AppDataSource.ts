import 'dotenv/config';
import 'reflect-metadata';
import {
  DataSource,
  DataSourceOptions,
  EntitySchema,
  MixedList,
} from 'typeorm';
import EquipmentEntity from './Entities/Equipment';
import ExerciseEntity from './Entities/Exercise';
import ImageExerciseEntity from './Entities/ImageExercise';
import MuscleGroupEntity from './Entities/MuscleGroup';

const EntityClasses: MixedList<Function | string | EntitySchema> = [
  EquipmentEntity,
  MuscleGroupEntity,
  ImageExerciseEntity,
  ExerciseEntity,
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
