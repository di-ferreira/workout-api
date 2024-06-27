import { Router } from 'express';
import { ExerciseController } from '../../database/typeorm/Controllers/Exercise.Controller';

const ExerciseRoutes = Router();

const controller = new ExerciseController();

ExerciseRoutes.get('/:id', controller.show);
ExerciseRoutes.put('/:id', controller.save);
ExerciseRoutes.delete('/:id', controller.remove);
ExerciseRoutes.get('', controller.list);
ExerciseRoutes.post('', controller.create);

export default ExerciseRoutes;
