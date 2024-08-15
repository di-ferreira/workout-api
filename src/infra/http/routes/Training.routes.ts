import { Router } from 'express';
import { TrainingController } from '../../database/typeorm/Controllers/Training.Controller';
import VerifyAuth from '../middlewares/VerifyAuth';

const TrainingRoutes = Router();

const controller = new TrainingController();

TrainingRoutes.post('', VerifyAuth, controller.create);
TrainingRoutes.get('', controller.list);
TrainingRoutes.get('/:id', controller.show);
TrainingRoutes.put('/:id', VerifyAuth, controller.save);
TrainingRoutes.delete('/:id', VerifyAuth, controller.remove);

export default TrainingRoutes;
