import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { iCreateExercise, iExercise } from '../../core/Entities/iExercise';
import {
  createEquipmentValidation,
  updateEquipmentValidation,
} from './Equipment.validation';
import {
  createImageExerciseValidation,
  updateImageExerciseValidation,
} from './ImageExercise.validation';
import {
  createMuscleGroupValidation,
  updateMuscleGroupValidation,
} from './MuscleGroup.validation';

export const createExerciseValidation: z.ZodType<iCreateExercise> = z.lazy(() =>
  z.object({
    name: z
      .string({
        invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim()
      .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
    muscle_group: z.array(
      z.union([createMuscleGroupValidation, updateMuscleGroupValidation]),
      {
        message: `Muscle Group ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Muscle group`,
      }
    ),
    equipment: z.array(
      z.union([createEquipmentValidation, updateEquipmentValidation]),
      {
        message: `Equipment ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Equipment`,
      }
    ),
    images: z.array(
      z.union([createImageExerciseValidation, updateImageExerciseValidation]),
      {
        message: `Image Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Image Exercise`,
      }
    ),
    substitutes: z.array(
      z.union([createExerciseValidation, updateExerciseValidation]),
      {
        message: `Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Exercise`,
      }
    ),
    tips: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
  })
);

export const updateExerciseValidation: z.ZodType<iExercise> = z.lazy(() =>
  z.object({
    id: z.number({
      invalid_type_error: `ID ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `ID ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    }),
    name: z
      .string({
        invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim()
      .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
    muscle_group: z.array(
      z.union([createMuscleGroupValidation, updateMuscleGroupValidation]),
      {
        message: `Muscle Group ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Muscle group`,
      }
    ),
    equipment: z.array(
      z.union([createEquipmentValidation, updateEquipmentValidation]),
      {
        message: `Equipment ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Equipment`,
      }
    ),
    images: z.array(
      z.union([createImageExerciseValidation, updateImageExerciseValidation]),
      {
        message: `Image Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Image Exercise`,
      }
    ),
    substitutes: z.array(
      z.union([createExerciseValidation, updateExerciseValidation]),
      {
        message: `Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Exercise`,
      }
    ),
    tips: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
  })
);

export type createExerciseValidationRepository = z.infer<
  typeof createExerciseValidation
>;

export type updateExerciseValidationRepository = z.infer<
  typeof updateExerciseValidation
>;
