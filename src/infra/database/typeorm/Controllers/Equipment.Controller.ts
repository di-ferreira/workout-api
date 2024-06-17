import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { EquipmentRepository } from '../../../../adapters/Equipment.Repository';
import { iEquipment } from '../../../../core/Entities/Equipment';
import { iEquipmentRepository } from '../../../../core/Repositories/iEquipment.Repository';
import CreateEquipmentsUseCase from '../../../../core/UseCases/Equipment/CreateEquipment';
import ListEquipmentsUseCase from '../../../../core/UseCases/Equipment/ListEquipments';
import AppError from '../../../http/ErrorHandlers';

export class EquipmentController {
  private listUseCase: ListEquipmentsUseCase;
  private createUseCase: CreateEquipmentsUseCase;
  private repository: iEquipmentRepository;

  constructor() {
    this.repository = new EquipmentRepository();
    this.listUseCase = new ListEquipmentsUseCase(this.repository);
    this.createUseCase = new CreateEquipmentsUseCase(this.repository);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
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

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description_name } = req.body;
      const newEquipment: iEquipment = {
        id: null,
        name,
        description_name,
      };
      const result = await this.createUseCase.execute(newEquipment);
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
