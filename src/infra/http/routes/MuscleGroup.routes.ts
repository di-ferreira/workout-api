import { Router } from 'express';
import { MuscleGroupController } from '../../database/typeorm/Controllers/MuscleGroup.Controller';

const MuscleGroupsRoutes = Router();

const controller = new MuscleGroupController();

MuscleGroupsRoutes.post('', controller.create);
MuscleGroupsRoutes.get('', controller.list);
MuscleGroupsRoutes.get('/:id', controller.show);
MuscleGroupsRoutes.put('/:id', controller.save);
MuscleGroupsRoutes.delete('/:id', controller.remove);

export default MuscleGroupsRoutes;
