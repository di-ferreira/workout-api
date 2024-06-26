import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { MuscleGroupRepository } from '../../../../adapters/MuscleGroups.Repository';
import { iMuscleGroup } from '../../../../core/Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../../../core/Repositories/iMuscleGroup.Repository';
import UseCaseCreateMuscleGroup from '../../../../core/UseCases/MuscleGroup/CreateMuscleGroup';
import UseCaseDeleteMuscleGroup from '../../../../core/UseCases/MuscleGroup/DeleteMuscleGroup';
import UseCaseFindByIdMuscleGroup from '../../../../core/UseCases/MuscleGroup/FindByIDMuscleGroup';
import UseCaseFindNameMuscleGroup from '../../../../core/UseCases/MuscleGroup/FindByNameMuscleGroup';
import UseCaseListMuscleGroup from '../../../../core/UseCases/MuscleGroup/ListMuscleGroup';
import UseCaseUpdateMuscleGroup from '../../../../core/UseCases/MuscleGroup/UpdateMuscleGroup';
import AppError from '../../../http/ErrorHandlers';

export class MuscleGroupController implements iController {
  private repository: iMuscleGroupRepository;
  private createUseCase: UseCaseCreateMuscleGroup;
  private listUseCase: UseCaseListMuscleGroup;
  private findByIdUseCase: UseCaseFindByIdMuscleGroup;
  private findByNameUseCase: UseCaseFindNameMuscleGroup;
  private updateUseCase: UseCaseUpdateMuscleGroup;
  private removeUseCase: UseCaseDeleteMuscleGroup;

  constructor() {
    this.repository = new MuscleGroupRepository();
    this.createUseCase = new UseCaseCreateMuscleGroup(this.repository);
    this.listUseCase = new UseCaseListMuscleGroup(this.repository);
    this.findByIdUseCase = new UseCaseFindByIdMuscleGroup(this.repository);
    this.findByNameUseCase = new UseCaseFindNameMuscleGroup(this.repository);
    this.updateUseCase = new UseCaseUpdateMuscleGroup(this.repository);
    this.removeUseCase = new UseCaseDeleteMuscleGroup(this.repository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
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

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    try {
      const listEquipment = await this.listUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });

      if (listEquipment.total_registers === 0) {
        return res.status(STATUS_CODE.NO_CONTENT).json(listEquipment);
      }

      return res.status(STATUS_CODE.SUCCESS).json(listEquipment);
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

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      let muscleGroup: iMuscleGroup | iMuscleGroup[] | null;
      const isNumber: boolean = !isNaN(Number(id));

      if (isNumber) {
        muscleGroup = await this.findByIdUseCase.execute(Number(id));
      } else {
        muscleGroup = await this.findByNameUseCase.execute(id);
      }

      if (!muscleGroup) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Muscle Group not found!' });
      }

      return res.status(STATUS_CODE.SUCCESS).json(muscleGroup);
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

  async save(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const { name, description_name } = req.body;
      const newMuscleGroup: iMuscleGroup = {
        id: Number(id),
        name,
        description_name,
      };

      const muscleGroup = await this.findByIdUseCase.execute(Number(id));

      if (!muscleGroup) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Muscle Group not found' });
      }

      const result = await this.updateUseCase.execute(newMuscleGroup);

      return res.status(STATUS_CODE.SUCCESS).json({ result });
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

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const muscleGroup = await this.findByIdUseCase.execute(Number(id));

      if (!muscleGroup) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Muscle Group not found' });
      }
      await this.removeUseCase.execute(muscleGroup);

      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ result: 'Success removed Muscle Group!' });
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
