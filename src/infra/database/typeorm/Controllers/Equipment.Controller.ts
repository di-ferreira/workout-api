import { Request, Response } from 'express';
import { EquipmentRepository } from '../../../../adapters/Equipment.Repository';
import { iEquipmentRepository } from '../../../../core/Repositories/iEquipment.Repository';
import ListEquipmentsUseCase from '../../../../core/UseCases/Equipment/ListEquipments';
import AppError from '../../../http/ErrorHandlers';

export class EquipmentController {
  private listUseCase: ListEquipmentsUseCase;
  private repository: iEquipmentRepository;

  constructor() {
    this.repository = new EquipmentRepository();
    this.listUseCase = new ListEquipmentsUseCase(this.repository);
    this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    if (this.listUseCase == undefined) {
      this.listUseCase = new ListEquipmentsUseCase(this.repository);
    }

    try {
      const listEquipment = await this.listUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });

      console.log('listEquipment', listEquipment);

      if (listEquipment.total_registers === 0) {
        return res.status(204).send(listEquipment);
      }

      return res.status(200).send(listEquipment);
    } catch (e) {
      console.error('Error controller: ' + e);

      if (e instanceof AppError) {
        return res.status(e.statusCode).send({ error: e.message });
      } else if (e instanceof Error) {
        return res.status(500).send({ error: e.message });
      } else {
        return res.status(500).send({ error: String(e) });
      }
    }
  }
}
