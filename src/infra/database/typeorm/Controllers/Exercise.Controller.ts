import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types';
import { iController } from '../../../../@types/workout';
import { ExerciceRepository } from '../../../../adapters/Exercise.Repository';
import { ImageExerciceRepository } from '../../../../adapters/ImageExercise.Repository';
import { iExercise } from '../../../../core/Entities/iExercise';
import { iCreateImageExercise } from '../../../../core/Entities/iImageExercise';
import { iExerciceRepository } from '../../../../core/Repositories/iExercise.Repository';
import { iImageExerciceRepository } from '../../../../core/Repositories/iImageExercise.Repository';
import CreateExerciseUseCase from '../../../../core/UseCases/Exercise/CreateExercise';
import AppError from '../../../http/ErrorHandlers';
import { removeLocalFiles } from '../../../utils/UploadImage';
import { removeCircularReferencesExercise } from '../../../utils/removeCircularReference';

export class ExerciseController implements iController {
  private repository: iExerciceRepository;
  private imageRepository: iImageExerciceRepository;
  private createUseCase: CreateExerciseUseCase;
  // private listUseCase: ListEquipmentsUseCase;
  // private findUseCase: FindByIdEquipmentsUseCase;
  // private findByNameUseCase: FindByNameEquipmentUseCase;
  // private updateUseCase: UpdateEquipmentsUseCase;
  // private removeUseCase: DeleteEquipmentsUseCase;

  constructor() {
    this.repository = new ExerciceRepository();
    this.imageRepository = new ImageExerciceRepository();
    this.createUseCase = new CreateExerciseUseCase(this.repository);
    this.create = this.create.bind(this);
    // this.listUseCase = new ListEquipmentsUseCase(this.repository);
    // this.findUseCase = new FindByIdEquipmentsUseCase(this.repository);
    // this.findByNameUseCase = new FindByNameEquipmentUseCase(this.repository);
    // this.updateUseCase = new UpdateEquipmentsUseCase(this.repository);
    // this.removeUseCase = new DeleteEquipmentsUseCase(this.repository);
    // this.list = this.list.bind(this);
    // this.show = this.show.bind(this);
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
          link: `${req.protocol}: //${req.get('host')}/uploads/images/${
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
    throw new Error('not implemented');
  }

  async show(req: Request, res: Response): Promise<Response> {
    throw new Error('not implemented');
  }

  async save(req: Request, res: Response): Promise<Response> {
    throw new Error('not implemented');
  }

  async remove(req: Request, res: Response): Promise<Response> {
    throw new Error('not implemented');
  }
}
