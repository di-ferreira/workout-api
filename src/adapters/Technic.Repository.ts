import { Like, Repository } from 'typeorm';
import { iList, SearchParams } from '../@types/workout';
import { iCreateTechnic, iTechnic } from '../core/Entities/iTechnic';
import { iTechnicRepository } from '../core/Repositories/iTechnic.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import TechnicEntity from '../infra/database/typeorm/Entities/Technic';

export class TechnicRepository implements iTechnicRepository {
  private CustomRepository: Repository<TechnicEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(TechnicEntity);
  }

  async findByName({ name, description }: iCreateTechnic): Promise<iTechnic[]> {
    return await this.CustomRepository.findBy([
      { name: Like(`%${name}%`) },
      { description: Like(`%${description}%`) },
    ]);
  }

  async findAll({ page, limit }: SearchParams): Promise<iList<iTechnic>> {
    const queryPage: number = page ? page : 1;
    const queryLimit: number = limit ? limit : 10;

    const [technic, count] = await this.CustomRepository.createQueryBuilder()
      .skip(queryLimit * (queryPage - 1))
      .take(queryLimit)
      .getManyAndCount();

    const result: iList<iTechnic> = {
      current_page: queryPage,
      data: technic,
      per_page: queryLimit,
      total_registers: count,
    };

    return result;
  }

  async findById(id: number): Promise<iTechnic | null> {
    return await this.CustomRepository.findOneBy({ id });
  }

  async createTechnic(technic: iTechnic): Promise<iTechnic> {
    const newTechnic = this.CustomRepository.create({
      name: technic.name,
      description: technic.description,
    });
    const result = await this.CustomRepository.save(newTechnic);
    return result;
  }

  async saveTechnic(technic: iTechnic): Promise<iTechnic> {
    const result = await this.CustomRepository.save({
      id: technic.id!,
      name: technic.name,
      description: technic.description,
    });
    return result;
  }

  async deleteTechnic(technic: iTechnic): Promise<void> {
    await this.CustomRepository.delete(technic.id!);
  }
}
