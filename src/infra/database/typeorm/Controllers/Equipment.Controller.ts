import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { EquipmentRepository } from '../../../../adapters/Equipment.Repository';
import { iEquipment } from '../../../../core/Entities/iEquipment';
import { iEquipmentRepository } from '../../../../core/Repositories/iEquipment.Repository';
import CreateEquipmentsUseCase from '../../../../core/UseCases/Equipment/CreateEquipment';
import DeleteEquipmentsUseCase from '../../../../core/UseCases/Equipment/DeleteEquipment';
import FindByIdEquipmentsUseCase from '../../../../core/UseCases/Equipment/FindByIDEquipment';
import FindByNameEquipmentUseCase from '../../../../core/UseCases/Equipment/FindByNameEquipment';
import ListEquipmentsUseCase from '../../../../core/UseCases/Equipment/ListEquipments';
import UpdateEquipmentsUseCase from '../../../../core/UseCases/Equipment/UpdateEquipment';
import { BadRequestError, NotFoundError } from '../../../helpers/ApiErrors';
import {
  createEquipmentValidation,
  updateEquipmentValidation,
} from '../../../validations/Equipment.validation';

export class EquipmentController implements iController {
  private listUseCase: ListEquipmentsUseCase;
  private findUseCase: FindByIdEquipmentsUseCase;
  private findByNameUseCase: FindByNameEquipmentUseCase;
  private createUseCase: CreateEquipmentsUseCase;
  private updateUseCase: UpdateEquipmentsUseCase;
  private removeUseCase: DeleteEquipmentsUseCase;
  private repository: iEquipmentRepository;

  constructor() {
    this.repository = new EquipmentRepository();
    this.listUseCase = new ListEquipmentsUseCase(this.repository);
    this.findUseCase = new FindByIdEquipmentsUseCase(this.repository);
    this.findByNameUseCase = new FindByNameEquipmentUseCase(this.repository);
    this.createUseCase = new CreateEquipmentsUseCase(this.repository);
    this.updateUseCase = new UpdateEquipmentsUseCase(this.repository);
    this.removeUseCase = new DeleteEquipmentsUseCase(this.repository);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    const listEquipment = await this.listUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    if (listEquipment.total_registers === 0) {
      return res.status(STATUS_CODE.NO_CONTENT).json(listEquipment);
    }

    return res.status(STATUS_CODE.SUCCESS).json(listEquipment);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let equipment: iEquipment | iEquipment[] | null;
    const isNumber: boolean = !isNaN(Number(id));

    if (isNumber) {
      equipment = await this.findUseCase.execute(Number(id));
    } else {
      equipment = await this.findByNameUseCase.execute(id);
    }

    if (!equipment) throw new NotFoundError('Equipment not found');

    return res.status(STATUS_CODE.SUCCESS).json(equipment);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, description_name } = req.body;
    const newEquipment: iEquipment = {
      id: 0,
      name,
      description_name,
    };

    const validationObj = createEquipmentValidation.safeParse(newEquipment);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

    const existsEquipments: iEquipment[] = await this.repository.findByName({
      name: newEquipment.name,
      description_name: newEquipment.description_name,
    });

    if (existsEquipments.length > 0) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: 'Exists Equipments with this name!',
        result: existsEquipments,
      });
    }

    const result = await this.createUseCase.execute(newEquipment);
    return res.status(STATUS_CODE.CREATED).json({ result });
  }

  async save(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description_name } = req.body;
    const newEquipment: iEquipment = {
      id: Number(id),
      name,
      description_name,
    };

    const validationObj = updateEquipmentValidation.safeParse(newEquipment);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

    const equipment = await this.findUseCase.execute(Number(id));

    if (!equipment) throw new NotFoundError('Equipment not found');

    const result = await this.updateUseCase.execute(newEquipment);

    return res.status(STATUS_CODE.SUCCESS).json({ result });
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const equipment = await this.findUseCase.execute(Number(id));

    if (!equipment) throw new NotFoundError('Equipment not found');

    await this.removeUseCase.execute(equipment);

    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ result: 'Success removed Equipment!' });
  }
}
