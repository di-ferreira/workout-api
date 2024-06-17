import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import AppError from './ErrorHandlers';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT;

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error!' });
  }
);

export function initServer() {
  app.listen(port, () => console.log(`🏆 server running on port ${port}`));
}
