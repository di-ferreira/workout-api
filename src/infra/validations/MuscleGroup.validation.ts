import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import {
  iCreateMuscleGroup,
  iMuscleGroup,
} from '../../core/Entities/iMuscleGroup';

export const createMuscleGroupValidation: z.ZodType<iCreateMuscleGroup> =
  z.object({
    name: z
      .string({
        invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim()
      .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
    description_name: z
      .string({
        invalid_type_error: `Description name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
        required_error: `Description name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
      })
      .trim()
      .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  });

export const updateMuscleGroupValidation: z.ZodType<iMuscleGroup> = z.object({
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
  description_name: z
    .string({
      invalid_type_error: `Description name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Description name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
});

export type createMuscleGroupValidationRepository = z.infer<
  typeof createMuscleGroupValidation
>;

export type updateMuscleGroupValidationRepository = z.infer<
  typeof updateMuscleGroupValidation
>;
