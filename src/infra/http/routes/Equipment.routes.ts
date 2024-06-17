import { Router } from 'express';
import { EquipmentController } from '../../database/typeorm/Controllers/Equipment.Controller';

const EquipmentRoutes = Router();

const controller = new EquipmentController();

EquipmentRoutes.get('', controller.list);
EquipmentRoutes.post('', controller.create);
EquipmentRoutes.get('/:id', controller.show);

export default EquipmentRoutes;
