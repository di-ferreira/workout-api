import { Router } from 'express';
import { TechnicController } from '../../database/typeorm/Controllers/Technic.Controller';

const TechnicRoutes = Router();

const controller = new TechnicController();

TechnicRoutes.post('', controller.create);
// TechnicRoutes.get('', controller.list);
// TechnicRoutes.get('/:id', controller.show);
// TechnicRoutes.put('/:id', controller.save);
// TechnicRoutes.delete('/:id', controller.remove);

export default TechnicRoutes;
