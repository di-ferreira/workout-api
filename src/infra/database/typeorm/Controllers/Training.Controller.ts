import { Request, Response } from 'express';
import { iController } from '../../../../@types/workout';
import { TrainingRepository } from '../../../../adapters/Training.Repository';
import { iTrainingRepository } from '../../../../core/Repositories/iTraining.Repository';
import CreateTrainingUseCase from '../../../../core/UseCases/Training/CreateTrainingUseCase';
import FindTrainingByIdUseCase from '../../../../core/UseCases/Training/FindTrainingByIdUseCase';
import FindTrainingByUserUseCase from '../../../../core/UseCases/Training/FindTrainingByUserUseCase';
import ListTrainingUseCase from '../../../../core/UseCases/Training/ListTrainingUseCase';
import RemoveTrainingUseCase from '../../../../core/UseCases/Training/RemoveTrainingUseCase';
import UpdateTrainingUseCase from '../../../../core/UseCases/Training/UpdateTrainingUseCase';

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
    throw new Error('Method not implemented.');
  }

  async show(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  async create(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  async save(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  async remove(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
