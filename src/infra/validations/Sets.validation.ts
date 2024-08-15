import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { iCreateSet, iSet } from '../../core/Entities/iSerie';

export const createSetValidation: z.ZodType<iCreateSet> = z.object({
  weight: z
    .number({
      invalid_type_error: `Weight ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Weight ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
  reps: z
    .number({
      invalid_type_error: `Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
  rest: z
    .number({
      invalid_type_error: `Rest ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Rest ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
});

export const updateSetValidation: z.ZodType<iSet> = z.object({
  id: z.number({
    invalid_type_error: `ID ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `ID ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  weight: z
    .number({
      invalid_type_error: `Weight ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Weight ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
  reps: z
    .number({
      invalid_type_error: `Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
  rest: z
    .number({
      invalid_type_error: `Rest ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
      required_error: `Rest ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .optional(),
});

export type createSetValidationRepository = z.infer<typeof createSetValidation>;

export type updateSetValidationRepository = z.infer<typeof updateSetValidation>;
