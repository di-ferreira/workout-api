import { AppDataSource } from './infra/database/typeorm/AppDataSource';
import { initServer } from './infra/http/server';

AppDataSource.initialize()
  .then(async () => {
    console.log('Initialize Database...');

    initServer();
  })
  .catch((error: any) => {
    console.error('Error controller: ' + error);
    if (error instanceof Error) {
      console.error('Error ->', error.message);
    } else {
      console.error('Error ->', String(error));
    }
  });

