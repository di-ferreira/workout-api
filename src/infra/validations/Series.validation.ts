import { z } from 'zod';
import { ERROR_MESSAGE } from '../../@types';
import { iCreateSeries, iSeries } from '../../core/Entities/iSerie';
import { updateExerciseValidation } from './Exercise.validation';
import { createSetValidation, updateSetValidation } from './Sets.validation';
import { updateTechnicValidation } from './Technic.validation';

export const createSeriesValidation: z.ZodType<iCreateSeries> = z.object({
  maximum_reps: z.number({
    invalid_type_error: `Maximum Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `Maximum Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  minimum_reps: z.number({
    invalid_type_error: `Minimum Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `Minimum Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  exercise: z.array(updateExerciseValidation, {
    message: `Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Exercise`,
  }),
  technics: z.array(updateTechnicValidation, {
    message: `Technics ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Technics`,
  }),
  sets: z.array(z.union([updateSetValidation, createSetValidation]), {
    message: `Series ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Series`,
  }),
});

export const updateSeriesValidation: z.ZodType<iSeries> = z.object({
  id: z.number({
    invalid_type_error: `ID ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `ID ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  maximum_reps: z.number({
    invalid_type_error: `Maximum Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `Maximum Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  minimum_reps: z.number({
    invalid_type_error: `Minimum Reps ${ERROR_MESSAGE.INVALID_TYPE_ERROR} number`,
    required_error: `Minimum Reps ${ERROR_MESSAGE.REQUIRED_ERROR}`,
  }),
  exercise: z.array(updateExerciseValidation, {
    message: `Exercise ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Exercise`,
  }),
  technics: z.array(updateTechnicValidation, {
    message: `Technics ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Technics`,
  }),
  sets: z.array(z.union([updateSetValidation, createSetValidation]), {
    message: `Series ${ERROR_MESSAGE.INVALID_TYPE_ERROR} array of Series`,
  }),
});

export type createSeriesValidationRepository = z.infer<
  typeof createSeriesValidation
>;

export type updateSeriesValidationRepository = z.infer<
  typeof updateSeriesValidation
>;
