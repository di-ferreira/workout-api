import { Router } from 'express';
import { MuscleGroupController } from '../../database/typeorm/Controllers/MuscleGroup.Controller';
import VerifyAuth from '../middlewares/VerifyAuth';

const MuscleGroupsRoutes = Router();

const controller = new MuscleGroupController();

MuscleGroupsRoutes.post('', VerifyAuth, controller.create);
MuscleGroupsRoutes.get('', controller.list);
MuscleGroupsRoutes.get('/:id', controller.show);
MuscleGroupsRoutes.put('/:id', VerifyAuth, controller.save);
MuscleGroupsRoutes.delete('/:id', VerifyAuth, controller.remove);

export default MuscleGroupsRoutes;
