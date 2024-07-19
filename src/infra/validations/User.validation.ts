import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { aUserRole, iCreateUser, iUser } from '../../core/Entities/iUser';

export const createUserValidation: z.ZodType<iCreateUser> = z.object({
  name: z
    .string({
      invalid_type_error: `Name ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Name ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(2, { message: `2 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  email: z
    .string({
      invalid_type_error: `Description ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Description ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .email({ message: `${ERROR_MESSAGE.FORMAT_ERROR} E-Mail` }),
  password: z
    .string({
      invalid_type_error: `Password ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Password ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(8, { message: `8 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  role: z.enum(aUserRole, {
    invalid_type_error: `the Role field does not have any of the values ${aUserRole.join(
      ' | '
    )}`,
  }),
});

export const updateUserValidation: z.ZodType<iUser> = z.object({
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
  email: z
    .string({
      invalid_type_error: `Description ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Description ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .email({ message: `${ERROR_MESSAGE.FORMAT_ERROR} E-Mail` }),
  password: z
    .string({
      invalid_type_error: `Password ${ERROR_MESSAGE.INVALID_TYPE_ERROR} string`,
      required_error: `Password ${ERROR_MESSAGE.REQUIRED_ERROR}`,
    })
    .trim()
    .min(8, { message: `8 ${ERROR_MESSAGE.MINIMUM_LENGTH_ERROR}` }),
  role: z.enum(aUserRole, {
    invalid_type_error: `the Role field does not have any of the values ${aUserRole.join(
      ' | '
    )}`,
  }),
});

export type createUserValidationRepository = z.infer<
  typeof createUserValidation
>;

export type updateUserValidationRepository = z.infer<
  typeof updateUserValidation
>;
