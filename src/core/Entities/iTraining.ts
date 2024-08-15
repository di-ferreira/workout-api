import { iCreateSeries, iSeries } from './iSerie';

export interface iTraining extends iCreateTraining {
  id: number;
}

export interface iCreateTraining {
  name: string;
  series: iSeries[] | iCreateSeries[];
}
