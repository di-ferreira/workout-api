import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types/index';
import { iController } from '../../../../@types/workout';
import { TrainingRepository } from '../../../../adapters/Training.Repository';
import { iTraining } from '../../../../core/Entities/iTraining';
import { iTrainingRepository } from '../../../../core/Repositories/iTraining.Repository';
import CreateTrainingUseCase from '../../../../core/UseCases/Training/CreateTrainingUseCase';
import FindTrainingByIdUseCase from '../../../../core/UseCases/Training/FindTrainingByIdUseCase';
import FindTrainingByUserUseCase from '../../../../core/UseCases/Training/FindTrainingByUserUseCase';
import ListTrainingUseCase from '../../../../core/UseCases/Training/ListTrainingUseCase';
import RemoveTrainingUseCase from '../../../../core/UseCases/Training/RemoveTrainingUseCase';
import UpdateTrainingUseCase from '../../../../core/UseCases/Training/UpdateTrainingUseCase';
import { BadRequestError, NotFoundError } from '../../../helpers/ApiErrors';
import { createTrainingValidation } from '../../../validations/Training.validation';

export class TrainingController implements iController {
  private listUseCase: ListTrainingUseCase;
  private findUseCase: FindTrainingByIdUseCase;
  private findByUserUseCase: FindTrainingByUserUseCase;
  private createUseCase: CreateTrainingUseCase;
  private updateUseCase: UpdateTrainingUseCase;
  private removeUseCase: RemoveTrainingUseCase;
  private repository: iTrainingRepository;

  constructor() {
    this.repository = new TrainingRepository();
    this.listUseCase = new ListTrainingUseCase(this.repository);
    this.findUseCase = new FindTrainingByIdUseCase(this.repository);
    this.findByUserUseCase = new FindTrainingByUserUseCase(this.repository);
    this.createUseCase = new CreateTrainingUseCase(this.repository);
    this.updateUseCase = new UpdateTrainingUseCase(this.repository);
    this.removeUseCase = new RemoveTrainingUseCase(this.repository);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;
    const listTraining = await this.listUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    if (listTraining.total_registers === 0) {
      return res.status(STATUS_CODE.NO_CONTENT).json(listTraining);
    }

    return res.status(STATUS_CODE.SUCCESS).json(listTraining);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let training: iTraining | iTraining[] | null;
    const isNumber: boolean = !isNaN(Number(id));

    if (isNumber) {
      training = await this.findUseCase.execute(Number(id));
    } else {
      training = await this.repository.findByName(id);
    }

    if (!training) {
      throw new NotFoundError('Training not found');
    }

    return res.status(STATUS_CODE.SUCCESS).json(training);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, series } = req.body;
    const newTraining: iTraining = {
      id: 0,
      name,
      series,
    };

    const validationObj = createTrainingValidation.safeParse(newTraining);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

    const existsTraining: iTraining[] = await this.repository.findByName(
      newTraining.name
    );

    if (existsTraining.length > 0) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: 'Exists Training with this name!',
        result: existsTraining,
      });
    }

    const result = await this.createUseCase.execute(newTraining);
    return res.status(STATUS_CODE.CREATED).json({ result });
  }

  async save(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  async remove(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
