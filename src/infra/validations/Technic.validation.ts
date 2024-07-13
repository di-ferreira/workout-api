import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { iCreateTechnic, iTechnic } from '../../core/Entities/iTechnic';

export const createTechnicValidation: z.ZodType<iCreateTechnic> = z.object({
  name: z
    .string({
      invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  description: z
    .string({
      invalid_type_error: `Description ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Description ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
});

export const updateTechnicValidation: z.ZodType<iTechnic> = z.object({
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
  description: z
    .string({
      invalid_type_error: `Description ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Description ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
});

export type createEquipmentValidationRepository = z.infer<
  typeof createTechnicValidation
>;

export type updateEquipmentValidationRepository = z.infer<
  typeof updateTechnicValidation
>;
