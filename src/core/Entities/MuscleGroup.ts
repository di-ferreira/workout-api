export interface iMuscleGroup {
  id: number | null;
  name: string;
  description_name: string;
}

export class MuscleGroup implements iMuscleGroup {
  constructor(
    public id: number,
    public name: string,
    public description_name: string
  ) {}
}
