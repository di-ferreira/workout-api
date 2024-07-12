import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { TechnicRepository } from '../../../../adapters/Technic.Repository';
import { iTechnic } from '../../../../core/Entities/iTechnic';
import { iTechnicRepository } from '../../../../core/Repositories/iTechnic.Repository';
import CreateTechnicUseCase from '../../../../core/UseCases/Technic/CreateTechnicUseCase';
import AppError from '../../../http/ErrorHandlers';

export class TechnicController implements iController {
  private repository: iTechnicRepository;
  private createUseCase: CreateTechnicUseCase;
  // private listUseCase: ListExerciseUseCase;
  // private findUseCase: FindByIdExerciseUseCase;
  // private updateUseCase: UpdateExerciseUseCase;
  // private removeUseCase: RemoveExerciseUseCase;

  constructor() {
    this.repository = new TechnicRepository();
    this.createUseCase = new CreateTechnicUseCase(this.repository);
    // this.listUseCase = new ListExerciseUseCase(this.repository);
    // this.findUseCase = new FindByIdExerciseUseCase(this.repository);
    // this.updateUseCase = new UpdateExerciseUseCase(this.repository);
    // this.removeUseCase = new RemoveExerciseUseCase(this.repository);
    this.create = this.create.bind(this);
    // this.list = this.list.bind(this);
    // this.show = this.show.bind(this);
    // this.save = this.save.bind(this);
    // this.remove = this.remove.bind(this);
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
      let equipment: iTechnic | iTechnic[] | null;
      const isNumber: boolean = !isNaN(Number(id));

      if (isNumber) {
        equipment = await this.findUseCase.execute(Number(id));
      } else {
        equipment = await this.findByNameUseCase.execute(id);
      }

      if (!equipment) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Equipamento não encontrado' });
      }

      return res.status(STATUS_CODE.SUCCESS).json(equipment);
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

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const newTechnic: iTechnic = {
        id: 0,
        name,
        description,
      };

      // const validationObj = createTechnicValidation.safeParse(newTechnic);

      // if (!validationObj.success) {
      //   return res.status(STATUS_CODE.BAD_REQUEST).send({
      //     error: validationObj.error.issues[0].message,
      //   });
      // }

      const existsTechnics: iTechnic[] = await this.repository.findByName({
        name: newTechnic.name,
        description: newTechnic.description,
      });

      if (existsTechnics.length > 0) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          error: 'Exists Technic with this name!',
          result: existsTechnics,
        });
      }

      const result = await this.createUseCase.execute(newTechnic);
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

  async save(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const { name, description } = req.body;
      const newTechnic: iTechnic = {
        id: Number(id),
        name,
        description,
      };

      const validationObj = updateEquipmentValidation.safeParse(newTechnic);

      if (!validationObj.success) {
        return res.status(STATUS_CODE.BAD_REQUEST).send({
          error: validationObj.error.issues[0].message,
        });
      }

      const equipment = await this.findUseCase.execute(Number(id));

      if (!equipment) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Equipment not found' });
      }

      const result = await this.updateUseCase.execute(newTechnic);

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
      const equipment = await this.findUseCase.execute(Number(id));

      if (!equipment) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Equipamento não encontrado' });
      }
      await this.removeUseCase.execute(equipment);

      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ result: 'Success removed Equipment!' });
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
