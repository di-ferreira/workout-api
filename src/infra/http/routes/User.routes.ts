import { Router } from 'express';
import { UserController } from '../../database/typeorm/Controllers/User.Controller';
import VerifyAuth from '../middlewares/VerifyAuth';

const UserRoutes = Router();

const controller = new UserController();

UserRoutes.post('', VerifyAuth, controller.create);
UserRoutes.get('', VerifyAuth, controller.list);
UserRoutes.post('/login', controller.login);
UserRoutes.get('/:id', VerifyAuth, controller.show);
UserRoutes.put('/:id', VerifyAuth, controller.save);
UserRoutes.delete('/:id', VerifyAuth, controller.remove);

export default UserRoutes;
