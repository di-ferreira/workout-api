import { Repository } from 'typeorm';
import { iExercise } from '../core/Entities/iExercise';
import { iImageExercise } from '../core/Entities/iImageExercise';
import { iImageExerciceRepository } from '../core/Repositories/iImageExercise.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import ImageExerciseEntity from '../infra/database/typeorm/Entities/ImageExercise';

export class ImageExerciceRepository implements iImageExerciceRepository {
  private CustomRepository: Repository<ImageExerciseEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(ImageExerciseEntity);
  }

  async countImagesFromExercise(exercise: iExercise): Promise<number> {
    const result: number = await this.CustomRepository.count({
      where: {
        exercise: {
          name: exercise.name,
        },
      },
    });
    return result && 0;
  }

  findById(id: number): Promise<iImageExercise | null> {
    throw new Error('Method not implemented.');
  }
  findByExercise(exercise: iExercise): Promise<iImageExercise | null> {
    throw new Error('Method not implemented.');
  }
  createExercice(imageExercise: iImageExercise): Promise<iImageExercise> {
    throw new Error('Method not implemented.');
  }
  saveExercice(imageExercise: iImageExercise): Promise<iImageExercise> {
    throw new Error('Method not implemented.');
  }
  deleteImageExercice(imageExercise: iImageExercise): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteImageExerciceByExercise(exerciseId: number): Promise<void> {
    await this.CustomRepository.delete({ exercise: { id: exerciseId } });
  }
}
