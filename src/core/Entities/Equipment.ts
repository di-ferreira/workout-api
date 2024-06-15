export interface iEquipment {
  id: number | null;
  name: string;
  description_name: string;
}

export class Equipment implements iEquipment {
  constructor(
    public id: number,
    public name: string,
    public description_name: string
  ) {}
}
