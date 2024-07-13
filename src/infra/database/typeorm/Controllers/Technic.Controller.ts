import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { TechnicRepository } from '../../../../adapters/Technic.Repository';
import { iTechnic } from '../../../../core/Entities/iTechnic';
import { iTechnicRepository } from '../../../../core/Repositories/iTechnic.Repository';
import CreateTechnicUseCase from '../../../../core/UseCases/Technic/CreateTechnicUseCase';
import FindByIdTechnicUseCase from '../../../../core/UseCases/Technic/FindByIdTechnicUseCase';
import FindByNameTechnicUseCase from '../../../../core/UseCases/Technic/FindByNameTechnicUseCase';
import ListTechnicUseCase from '../../../../core/UseCases/Technic/ListTechnicUseCase';
import RemoveTechnicUseCase from '../../../../core/UseCases/Technic/RemoveTechnicUseCase';
import UpdateTechnicUseCase from '../../../../core/UseCases/Technic/UpdateTechnicUseCase';
import { BadRequestError, NotFoundError } from '../../../helpers/ApiErrors';
import AppError from '../../../http/ErrorHandlers';
import {
  createTechnicValidation,
  updateTechnicValidation,
} from '../../../validations/Technic.validation';

export class TechnicController implements iController {
  private repository: iTechnicRepository;
  private createUseCase: CreateTechnicUseCase;
  private listUseCase: ListTechnicUseCase;
  private findUseCase: FindByIdTechnicUseCase;
  private findByNameUseCase: FindByNameTechnicUseCase;
  private updateUseCase: UpdateTechnicUseCase;
  private removeUseCase: RemoveTechnicUseCase;

  constructor() {
    this.repository = new TechnicRepository();
    this.createUseCase = new CreateTechnicUseCase(this.repository);
    this.listUseCase = new ListTechnicUseCase(this.repository);
    this.findUseCase = new FindByIdTechnicUseCase(this.repository);
    this.findByNameUseCase = new FindByNameTechnicUseCase(this.repository);
    this.updateUseCase = new UpdateTechnicUseCase(this.repository);
    this.removeUseCase = new RemoveTechnicUseCase(this.repository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;
    const listTechnics = await this.listUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    if (listTechnics.total_registers === 0) {
      return res.status(STATUS_CODE.NO_CONTENT).json(listTechnics);
    }

    return res.status(STATUS_CODE.SUCCESS).json(listTechnics);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      let technic: iTechnic | iTechnic[] | null;
      const isNumber: boolean = !isNaN(Number(id));

      if (isNumber) {
        technic = await this.findUseCase.execute(Number(id));
      } else {
        technic = await this.findByNameUseCase.execute(id);
      }

      if (!technic) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Technic not found' });
      }

      return res.status(STATUS_CODE.SUCCESS).json(technic);
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
    const { name, description } = req.body;
    const newTechnic: iTechnic = {
      id: 0,
      name,
      description,
    };

    const validationObj = createTechnicValidation.safeParse(newTechnic);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

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
  }

  async save(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { name, description } = req.body;
    const newTechnic: iTechnic = {
      id: Number(id),
      name,
      description,
    };

    const validationObj = updateTechnicValidation.safeParse(newTechnic);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

    const technic = await this.findUseCase.execute(Number(id));

    if (!technic) throw new NotFoundError('Technic not found');

    const result = await this.updateUseCase.execute(newTechnic);

    return res.status(STATUS_CODE.SUCCESS).json({ result });
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const technic = await this.findUseCase.execute(Number(id));

    if (!technic) throw new NotFoundError('Technic not found');
    await this.removeUseCase.execute(technic);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ result: 'Success removed Technic!' });
  }
}
