import { Router } from 'express';
import { MuscleGroupController } from '../../database/typeorm/Controllers/MuscleGroup.Controller';

const MuscleGroupsRoutes = Router();

const controller = new MuscleGroupController();

MuscleGroupsRoutes.post('', controller.create);
MuscleGroupsRoutes.get('', controller.list);
MuscleGroupsRoutes.get('/:id', controller.show);

export default MuscleGroupsRoutes;
