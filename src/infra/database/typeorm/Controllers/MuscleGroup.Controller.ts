import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { MuscleGroupRepository } from '../../../../adapters/MuscleGroups.Repository';
import { iMuscleGroup } from '../../../../core/Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../../../core/Repositories/iMuscleGroup.Repository';
import UseCaseCreateMuscleGroup from '../../../../core/UseCases/MuscleGroup/CreateMuscleGroup';
import AppError from '../../../http/ErrorHandlers';

export class MuscleGroupController {
  private repository: iMuscleGroupRepository;
  private createUseCase: UseCaseCreateMuscleGroup;

  constructor() {
    this.repository = new MuscleGroupRepository();
    this.createUseCase = new UseCaseCreateMuscleGroup(this.repository);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description_name } = req.body;
      const newMuscleGroup: iMuscleGroup = {
        id: 0,
        name,
        description_name,
      };

      const existsMuscleGroup: iMuscleGroup[] =
        await this.repository.findByName({
          name: newMuscleGroup.name,
          description_name: newMuscleGroup.description_name,
        });

      if (existsMuscleGroup.length > 0) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          error: 'Exists Muscle Group with this name!',
          result: existsMuscleGroup,
        });
      }

      const result = await this.createUseCase.execute(newMuscleGroup);
      return res.status(STATUS_CODE.CREATED).json({ result });
    } catch (e) {
      console.error('Error controller: ' + e);

      if (e instanceof AppError) {
        return res.status(e.statusCode).send({ error: e.message });
      } else if (e instanceof Error) {
        return res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .send({ error: e.message });
      } else {
        return res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .send({ error: String(e) });
      }
    }
  }
}
