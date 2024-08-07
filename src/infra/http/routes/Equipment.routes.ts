import { Router } from 'express';
import { EquipmentController } from '../../database/typeorm/Controllers/Equipment.Controller';
import VerifyAuth from '../middlewares/VerifyAuth';

const EquipmentRoutes = Router();

const controller = new EquipmentController();

EquipmentRoutes.get('/:id', controller.show);
EquipmentRoutes.put('/:id', VerifyAuth, controller.save);
EquipmentRoutes.delete('/:id', VerifyAuth, controller.remove);
EquipmentRoutes.get('', controller.list);
EquipmentRoutes.post('', VerifyAuth, controller.create);

export default EquipmentRoutes;
