import { Router } from 'express';
import { UserController } from '../../database/typeorm/Controllers/User.Controller';

const UserRoutes = Router();

const controller = new UserController();

UserRoutes.post('', controller.create);
UserRoutes.get('', controller.list);
UserRoutes.post('/login', controller.login);
UserRoutes.get('/:id', controller.show);
UserRoutes.put('/:id', controller.save);
UserRoutes.delete('/:id', controller.remove);

export default UserRoutes;
