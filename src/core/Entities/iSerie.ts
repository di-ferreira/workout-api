import { iExercise } from './iExercise';
import { iTechnic } from './iTechnic';

export interface iSet extends iCreateSet {
  id: number;
}

export interface iCreateSet {
  weight?: number;
  reps?: number;
  rest?: number;
}

export interface iSeries extends iCreateSeries {
  id: number;
}

export interface iCreateSeries {
  exercise: iExercise[];
  maximum_reps: number;
  minimum_reps: number;
  technics: iTechnic[];
  sets: iSet[] | iCreateSet[];
}
