import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT;

export function initServer() {
  app.listen(port, () => console.log(`🏆 server running on port ${port}`));
}
