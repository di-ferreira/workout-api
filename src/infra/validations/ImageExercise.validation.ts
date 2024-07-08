import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import {
  iCreateImageExercise,
  iImageExercise,
} from '../../core/Entities/iImageExercise';

export const createImageExerciseValidation: z.ZodType<iCreateImageExercise> =
  z.object({
    name: z
      .string({
        invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim()
      .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
    link: z
      .string({
        invalid_type_error: `Link ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Link ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim(),
  });

export const updateImageExerciseValidation: z.ZodType<iImageExercise> =
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
    link: z
      .string({
        invalid_type_error: `Link ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Link ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim(),
  });

export type createImageExerciseValidationRepository = z.infer<
  typeof createImageExerciseValidation
>;

export type updateImageExerciseValidationRepository = z.infer<
  typeof updateImageExerciseValidation
>;
