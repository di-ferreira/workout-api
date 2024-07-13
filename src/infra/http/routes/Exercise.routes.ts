import { Router } from 'express';
import { ExerciseController } from '../../database/typeorm/Controllers/Exercise.Controller';
import { upload } from '../../helpers/UploadImage';

const ExerciseRoutes = Router();

const controller = new ExerciseController();

ExerciseRoutes.get('/:id', controller.show);
ExerciseRoutes.put('/:id', upload.array('images', 10), controller.save);
ExerciseRoutes.delete('/:id', controller.remove);
ExerciseRoutes.get('', controller.list);
ExerciseRoutes.post('', upload.array('images', 10), controller.create);

export default ExerciseRoutes;
