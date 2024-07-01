import { Router } from 'express';
import EquipmentRoutes from './Equipment.routes';
import ExerciseRoutes from './Exercise.routes';
import MuscleGroupsRoutes from './MuscleGroup.routes';

const routes = Router();

routes.use('/equipments', EquipmentRoutes);
routes.use('/muscle-groups', MuscleGroupsRoutes);
routes.use('/exercises', ExerciseRoutes);

export default routes;
