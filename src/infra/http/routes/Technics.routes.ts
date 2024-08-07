import { Router } from 'express';
import { TechnicController } from '../../database/typeorm/Controllers/Technic.Controller';
import VerifyAuth from '../middlewares/VerifyAuth';

const TechnicRoutes = Router();

const controller = new TechnicController();

TechnicRoutes.post('', VerifyAuth, controller.create);
TechnicRoutes.get('', controller.list);
TechnicRoutes.get('/:id', controller.show);
TechnicRoutes.put('/:id', VerifyAuth, controller.save);
TechnicRoutes.delete('/:id', VerifyAuth, controller.remove);

export default TechnicRoutes;
