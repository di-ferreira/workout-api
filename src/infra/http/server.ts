import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { errorMiddleware } from './middlewares/Error';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/v1', routes);

const port = process.env.PORT;

app.use(errorMiddleware);

export function initServer() {
  app.listen(port, () => console.log(`🏆 server running on port ${port}`));
}
