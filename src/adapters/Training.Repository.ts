import { SearchParams, iList } from '@/@types/workout';
import { iTraining } from '@/core/Entities/iTraining';
import { iUser } from '@/core/Entities/iUser';
import { Repository } from 'typeorm';
import { iTrainingRepository } from '../core/Repositories/iTraining.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import TrainingEntity from '../infra/database/typeorm/Entities/Training';
import UserEntity from '../infra/database/typeorm/Entities/User';

export class TrainingRepository implements iTrainingRepository {
  private CustomRepository: Repository<TrainingEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(TrainingEntity);
  }

  async findById(id: number): Promise<iTraining | null> {
    return await this.CustomRepository.findOneBy({ id });
  }

  async findAll({ page, limit }: SearchParams): Promise<iList<iTraining>> {
    const queryPage: number = page ? page : 1;
    const queryLimit: number = limit ? limit : 10;

    const [trainings, count] = await this.CustomRepository.createQueryBuilder(
      'training'
    )
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('training_user.trainingId')
          .from('user_trainings_training', 'training_user')
          .where('training_user.trainingId = training.id')
          .getQuery();
        return `NOT EXISTS ${subQuery}`;
      })
      .skip(queryLimit * (queryPage - 1))
      .take(queryLimit)
      .getManyAndCount();

    const result: iList<iTraining> = {
      current_page: queryPage,
      data: trainings,
      per_page: queryLimit,
      total_registers: count,
    };

    return result;
  }

  async findByUser(user: iUser): Promise<iTraining[]> {
    const userTraining = await this.CustomRepository.manager.findOne(
      UserEntity,
      {
        select: {
          trainings: true,
        },
        where: { id: user.id },
        relations: { trainings: true },
      }
    );

    return userTraining ? userTraining.trainings : [];
  }

  async findByName(trainingName: string): Promise<iTraining[]> {
    const training = await this.CustomRepository.findBy([
      {
        name: trainingName,
      },
    ]);

    return training;
  }

  async createTraining(training: iTraining): Promise<iTraining> {
    const newTraining = this.CustomRepository.create({
      name: training.name,
      series: training.series,
    });
    const result = await this.CustomRepository.save(newTraining);
    return result;
  }

  async saveTraining(training: iTraining): Promise<iTraining> {
    const result = this.CustomRepository.save({
      id: training.id,
      name: training.name,
      series: training.series,
    });
    return result;
  }

  async deleteTraining(training: iTraining): Promise<void> {
    await this.CustomRepository.delete(training.id);
  }
}
