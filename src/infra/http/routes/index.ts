import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/exercise', (req: Request, res: Response) => {
  return res.status(200).json({ return: 'Rota exercicio' });
});

export default routes;
