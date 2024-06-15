export interface iImageExercise {
  id: number | null;
  name: string;
  link: string;
}

export class ImageExercise implements iImageExercise {
  constructor(public id: number, public name: string, public link: string) {}
}
