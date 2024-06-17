import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import Equipment from './Entities/Equipment';

let DSConfig: DataSourceOptions;

DSConfig = {
  type: 'better-sqlite3',
  database: process.env.DATABASE_NAME!,
  entities: [Equipment],
  entitySkipConstructor: true,
  synchronize: true,
  logging: false,
};

// if (process.env.NODE_ENV === 'production') {
//   DSConfig = {
//     type: 'mariadb',
//     database: 'workoutDB',
//     host: 'localhost',
//     password: '',
//     port: 3306,
//     username: 'root',
//     entities: ['./entities/*.{js,ts}'],
//     // migrations: ['./src/database/migrations/*.ts'],
//     synchronize: true,
//   };
// }

export const AppDataSource = new DataSource(DSConfig);
