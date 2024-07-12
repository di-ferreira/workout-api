import { iExercise } from './iExercise';
import { iTechnics } from './iTechnic';

export interface iSet {
  id: number;
}

export interface iCreateSet {
  weight: number;
  reps: number;
  rest: number;
}

export interface iSeries {
  id: number;
}

export interface iCreateSeries {
  exercise: iExercise | iExercise[];
  maximum_reps: number;
  minimum_reps: number;
  technics?: iTechnics | iTechnics[];
  sets: iSet[];
}
