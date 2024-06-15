import AppDataSource from './infra/database/typeorm/AppDataSource';
import { initServer } from './infra/http/server';

AppDataSource.initialize()
  .then(async () => {
    console.log('Initialize Database...');

    initServer();
  })
  .catch((error) => console.log('Error -> ', error));

