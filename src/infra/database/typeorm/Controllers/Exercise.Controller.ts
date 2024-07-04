import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { ExerciceRepository } from '../../../../adapters/Exercise.Repository';
import { ImageExerciceRepository } from '../../../../adapters/ImageExercise.Repository';
import { iExercise } from '../../../../core/Entities/iExercise';
import { iCreateImageExercise } from '../../../../core/Entities/iImageExercise';
import { iExerciseRepository } from '../../../../core/Repositories/iExercise.Repository';
import { iImageExerciceRepository } from '../../../../core/Repositories/iImageExercise.Repository';
import CreateExerciseUseCase from '../../../../core/UseCases/Exercise/CreateExercise';
import FindByIdExerciseUseCase from '../../../../core/UseCases/Exercise/FindByIdExercise';
import FindByNameExerciseUseCase from '../../../../core/UseCases/Exercise/FindByNameExercise';
import ListExerciseUseCase from '../../../../core/UseCases/Exercise/ListExercise';
import AppError from '../../../http/ErrorHandlers';
import { removeLocalFiles } from '../../../utils/UploadImage';
import { removeCircularReferencesExercise } from '../../../utils/removeCircularReference';

export class ExerciseController implements iController {
  private repository: iExerciseRepository;
  private imageRepository: iImageExerciceRepository;
  private createUseCase: CreateExerciseUseCase;
  private listUseCase: ListExerciseUseCase;
  private findUseCase: FindByIdExerciseUseCase;
  private findByNameUseCase: FindByNameExerciseUseCase;
  // private updateUseCase: UpdateEquipmentsUseCase;
  // private removeUseCase: DeleteEquipmentsUseCase;

  constructor() {
    this.repository = new ExerciceRepository();
    this.imageRepository = new ImageExerciceRepository();
    this.createUseCase = new CreateExerciseUseCase(this.repository);
    this.create = this.create.bind(this);
    this.listUseCase = new ListExerciseUseCase(this.repository);
    this.findUseCase = new FindByIdExerciseUseCase(this.repository);
    this.findByNameUseCase = new FindByNameExerciseUseCase(this.repository);
    // this.updateUseCase = new UpdateEquipmentsUseCase(this.repository);
    // this.removeUseCase = new DeleteEquipmentsUseCase(this.repository);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    // this.save = this.save.bind(this);
    // this.remove = this.remove.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      instructions,
      tips,
      muscle_group,
      equipment,
      substitutes,
    } = req.body;

    const files = req.files as Express.Multer.File[];

    try {
      const newExercise: iExercise = {
        name,
        description,
        instructions,
        tips,
        muscle_group: JSON.parse(muscle_group),
        equipment: JSON.parse(equipment),
        substitutes: JSON.parse(substitutes),
        images: [],
        id: 0,
      };

      // TODO validations Exercises
      // const validationObj = createEquipmentValidation.safeParse(newEquipment);

      // if (!validationObj.success) {
      //   return res.status(STATUS_CODE.BAD_REQUEST).send({
      //     error: validationObj.error.issues[0].message,
      //   });
      // }

      const imagesUploaded: iCreateImageExercise[] = [];
      files.map((image) => {
        imagesUploaded.push({
          name: image.filename,
          link: `${req.protocol}://${req.get('host')}/v1/images/${
            image.filename
          }`,
        });
      });

      newExercise.images = imagesUploaded;
      const createdExercise = await this.createUseCase.execute(newExercise);
      const result = JSON.stringify(
        createdExercise,
        removeCircularReferencesExercise
      );
      return res
        .status(STATUS_CODE.CREATED)
        .json({ result: JSON.parse(result) });
    } catch (e) {
      if (files) {
        removeLocalFiles(files);
      }
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
      const listExercise = await this.listUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });

      if (listExercise.total_registers === 0) {
        return res.status(STATUS_CODE.NO_CONTENT).json(listExercise);
      }

      return res.status(STATUS_CODE.SUCCESS).json(listExercise);
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
      let exercise: iExercise | iExercise[] | null;
      const isNumber: boolean = !isNaN(Number(id));

      // exercise = await this.findUseCase.execute(Number(id));
      if (isNumber) {
        exercise = await this.findUseCase.execute(Number(id));
      } else {
        exercise = await this.findByNameUseCase.execute(id);
      }

      if (!exercise || (exercise as iExercise[]).length < 1) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ result: 'Nenhum exercício não encontrado' });
      }

      return res.status(STATUS_CODE.SUCCESS).json(exercise);
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
    throw new Error('not implemented');
  }

  async remove(req: Request, res: Response): Promise<Response> {
    throw new Error('not implemented');
  }
}
