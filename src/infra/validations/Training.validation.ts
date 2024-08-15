import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { iCreateTraining, iTraining } from '../../core/Entities/iTraining';
import {
  createSeriesValidation,
  updateSeriesValidation,
} from './Series.validation';

export const createTrainingValidation: z.ZodType<iCreateTraining> = z.object({
  name: z
    .string({
      invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  series: z.array(z.union([createSeriesValidation, updateSeriesValidation]), {
    message: `Training ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Training`,
  }),
});

export const updateTrainingValidation: z.ZodType<iTraining> = z.object({
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
  series: z.array(z.union([createSeriesValidation, updateSeriesValidation]), {
    message: `Training ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Training`,
  }),
});

export type createTrainingValidationRepository = z.infer<
  typeof createTrainingValidation
>;

export type updateTrainingValidationRepository = z.infer<
  typeof updateTrainingValidation
>;
