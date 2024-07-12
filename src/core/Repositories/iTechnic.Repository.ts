import { SearchParams, iList } from '../../@types/workout';
import { iCreateTechnic, iTechnic } from '../Entities/iTechnic';

export interface iTechnicRepository {
  findAll(params?: SearchParams): Promise<iList<iTechnic>>;

  findById(id: number): Promise<iTechnic | null>;

  findByName(params: iCreateTechnic): Promise<iTechnic[]>;

  createTechnic(technic: iTechnic): Promise<iTechnic>;

  saveTechnic(technic: iTechnic): Promise<iTechnic>;

  deleteTechnic(technic: iTechnic): Promise<void>;
}
