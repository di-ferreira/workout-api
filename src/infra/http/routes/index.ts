import express, { Router } from 'express';
import path from 'path';
import EquipmentRoutes from './Equipment.routes';
import ExerciseRoutes from './Exercise.routes';
import MuscleGroupsRoutes from './MuscleGroup.routes';
import TechnicRoutes from './Technics.routes';
import UserRoutes from './User.routes';

const routes = Router();

routes.use('/equipments', EquipmentRoutes);
routes.use('/muscle-groups', MuscleGroupsRoutes);
routes.use('/exercises', ExerciseRoutes);
routes.use('/technics', TechnicRoutes);
routes.use('/users', UserRoutes);

routes.use(
  '/images',
  express.static(
    path.join(__dirname, '..', '..', '..', '..', 'public', 'images', 'exercise')
  )
);

export default routes;
