import { Request, Response, Router } from 'express';
import EquipmentRoutes from './Equipment.routes';
import MuscleGroupsRoutes from './MuscleGroup.routes';

const routes = Router();

routes.use('/equipments', EquipmentRoutes);
routes.use('/muscle-groups', MuscleGroupsRoutes);
routes.get('/exercise', (req: Request, res: Response) => {
  return res.status(200).json({ return: 'Rota exercicio' });
});

export default routes;
