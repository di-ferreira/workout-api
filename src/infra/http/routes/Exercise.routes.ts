import { Router } from 'express';
import { ExerciseController } from '../../database/typeorm/Controllers/Exercise.Controller';
import { upload } from '../../helpers/UploadImage';
import VerifyAuth from '../middlewares/VerifyAuth';

const ExerciseRoutes = Router();

const controller = new ExerciseController();

ExerciseRoutes.get('/:id', controller.show);
ExerciseRoutes.put(
  '/:id',
  VerifyAuth,
  upload.array('images', 10),
  controller.save
);
ExerciseRoutes.delete('/:id', VerifyAuth, controller.remove);
ExerciseRoutes.get('', controller.list);
ExerciseRoutes.post(
  '',
  VerifyAuth,
  upload.array('images', 10),
  controller.create
);

export default ExerciseRoutes;
