import { Request, Response, Router } from 'express';
import EquipmentRoutes from './Equipment.routes';

const routes = Router();

routes.use('/equipments', EquipmentRoutes);
routes.use('/exercise', (req: Request, res: Response) => {
  return res.status(200).json({ return: 'Rota exercicio' });
});

export default routes;
