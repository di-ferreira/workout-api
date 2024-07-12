import { iSeries } from './iSerie';

export interface iTraining {
  id: number;
}

export interface iCreateTraining {
  name: string;
  series: iSeries[];
}
