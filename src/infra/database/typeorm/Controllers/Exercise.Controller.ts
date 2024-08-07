import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { ExerciceRepository } from '../../../../adapters/Exercise.Repository';
import { ImageExerciceRepository } from '../../../../adapters/ImageExercise.Repository';
import { iEquipment } from '../../../../core/Entities/iEquipment';
import { iExercise } from '../../../../core/Entities/iExercise';
import {
  iCreateImageExercise,
  iImageExercise,
} from '../../../../core/Entities/iImageExercise';
import { iExerciseRepository } from '../../../../core/Repositories/iExercise.Repository';
import { iImageExerciceRepository } from '../../../../core/Repositories/iImageExercise.Repository';
import CreateExerciseUseCase from '../../../../core/UseCases/Exercise/CreateExercise';
import FindByIdExerciseUseCase from '../../../../core/UseCases/Exercise/FindByIdExercise';
import FindByNameExerciseUseCase from '../../../../core/UseCases/Exercise/FindByNameExercise';
import ListExerciseUseCase from '../../../../core/UseCases/Exercise/ListExercise';
import RemoveExerciseUseCase from '../../../../core/UseCases/Exercise/RemoveExercise';
import UpdateExerciseUseCase from '../../../../core/UseCases/Exercise/UpdateExercise';
import { BadRequestError, NotFoundError } from '../../../helpers/ApiErrors';
import { removeLocalFiles } from '../../../helpers/UploadImage';
import { removeCircularReferencesExercise } from '../../../helpers/removeCircularReference';
import AppError from '../../../http/ErrorHandlers';
import {
  createExerciseValidation,
  updateExerciseValidation,
} from '../../../validations/Exercise.validation';

export class ExerciseController implements iController {
  private repository: iExerciseRepository;
  private imageRepository: iImageExerciceRepository;
  private createUseCase: CreateExerciseUseCase;
  private listUseCase: ListExerciseUseCase;
  private findUseCase: FindByIdExerciseUseCase;
  private findByNameUseCase: FindByNameExerciseUseCase;
  private updateUseCase: UpdateExerciseUseCase;
  private removeUseCase: RemoveExerciseUseCase;

  constructor() {
    this.repository = new ExerciceRepository();
    this.imageRepository = new ImageExerciceRepository();
    this.createUseCase = new CreateExerciseUseCase(this.repository);
    this.listUseCase = new ListExerciseUseCase(this.repository);
    this.findUseCase = new FindByIdExerciseUseCase(this.repository);
    this.findByNameUseCase = new FindByNameExerciseUseCase(this.repository);
    this.updateUseCase = new UpdateExerciseUseCase(this.repository);
    this.removeUseCase = new RemoveExerciseUseCase(this.repository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
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
        equipment: JSON.parse(equipment) ?? ([] as iEquipment[]),
        substitutes: JSON.parse(substitutes) ?? ([] as iExercise[]),
        images: [],
        id: 0,
      };

      const imagesUploaded: iCreateImageExercise[] = [];
      files.map((image) => {
        imagesUploaded.push({
          name: image.filename,
          link: `${req.protocol}://${req.get('host')}/v1/images/${
            image.filename
          }`,
        });
      });

      newExercise.images = imagesUploaded ?? ([] as iImageExercise[]);

      const existsExercises: iExercise[] = await this.repository.findByName(
        newExercise.name
      );

      if (existsExercises.length > 0) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          error: 'Exists Exercise with this name!',
          result: existsExercises,
        });
      }

      const validationObj = createExerciseValidation.safeParse(newExercise);

      if (!validationObj.success) {
        if (files) {
          removeLocalFiles(files);
        }
        throw new BadRequestError(validationObj.error.issues[0].message);
      }

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

    const listExercise = await this.listUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    if (listExercise.total_registers === 0) {
      return res.status(STATUS_CODE.NO_CONTENT).json(listExercise);
    }

    return res.status(STATUS_CODE.SUCCESS).json(listExercise);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let exercise: iExercise | iExercise[] | null;
    const isNumber: boolean = !isNaN(Number(id));

    if (isNumber) {
      exercise = await this.findUseCase.execute(Number(id));
    } else {
      exercise = await this.findByNameUseCase.execute(id);
    }

    if (!exercise || (exercise as iExercise[]).length < 1)
      throw new NotFoundError('Exercise not found');

    return res.status(STATUS_CODE.SUCCESS).json(exercise);
  }

  async save(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
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
        id: Number(id),
        name,
        description,
        instructions,
        tips,
        muscle_group: JSON.parse(muscle_group),
        equipment: JSON.parse(equipment) ?? ([] as iEquipment[]),
        substitutes: JSON.parse(substitutes) ?? ([] as iExercise[]),
        images: [],
      };

      const exercise = await this.findUseCase.execute(Number(id));

      if (!exercise) {
        if (files) {
          removeLocalFiles(files);
        }

        throw new NotFoundError('Exercise not found');
      }

      const imagesUploaded: iCreateImageExercise[] = [];
      files.map((image) => {
        imagesUploaded.push({
          name: image.filename,
          link: `${req.protocol}://${req.get('host')}/v1/images/${
            image.filename
          }`,
        });
      });

      newExercise.images = [...exercise.images, ...imagesUploaded];

      const validationObj = updateExerciseValidation.safeParse(newExercise);

      if (!validationObj.success) {
        if (files) {
          removeLocalFiles(files);
        }
        throw new BadRequestError(validationObj.error.issues[0].message);
      }

      const updatedExercise = await this.updateUseCase.execute(newExercise);
      const result = JSON.stringify(
        updatedExercise,
        removeCircularReferencesExercise
      );

      return res
        .status(STATUS_CODE.SUCCESS)
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

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      let exercise: iExercise | iExercise[] | null;
      const isNumber: boolean = !isNaN(Number(id));

      if (!isNumber) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ result: 'ID is not a number' });
      }

      exercise = await this.findUseCase.execute(Number(id));

      if (!exercise) throw new NotFoundError('Exercise not found');

      await this.imageRepository.deleteImageExerciceByExercise(exercise.id);

      exercise.equipment = [];
      exercise.muscle_group = [];
      exercise.substitutes = [];

      await this.updateUseCase.execute(exercise);
      await this.removeUseCase.execute(exercise.id);

      const filesToRemove: Express.Multer.File[] = exercise.images.map(
        (image) => {
          return {
            filename: image.name,
          };
        }
      ) as Express.Multer.File[];

      removeLocalFiles(filesToRemove);
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ result: 'Success remove Exercise!' });
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
