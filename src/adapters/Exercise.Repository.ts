import { iExercise } from '@/core/Entities/iExercise';
import { iImageExercise } from '@/core/Entities/iImageExercise';
import { iMuscleGroup } from '@/core/Entities/iMuscleGroup';
import { Repository } from 'typeorm';
import { iList, SearchParams } from '../@types/workout';
import { iEquipment } from '../core/Entities/iEquipment';
import { iExerciceRepository } from '../core/Repositories/iExercise.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import ExerciseEntity from '../infra/database/typeorm/Entities/Exercise';

export class ExerciceRepository implements iExerciceRepository {
  private CustomRepository: Repository<ExerciseEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(ExerciseEntity);
  }

  createExercice(iExercise: iExercise): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  saveExercice(iExercise: iExercise): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  findAll(params?: SearchParams): Promise<iList<iExercise>> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<iExercise | null> {
    throw new Error('Method not implemented.');
  }

  deleteExercice(iExercise: iExercise): Promise<void> {
    throw new Error('Method not implemented.');
  }

  addImage(image: iImageExercise | iImageExercise[]): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  addSubstitute(image: iExercise | iExercise[]): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  addEquipment(equipment: iEquipment | iEquipment[]): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  addMuscleGroup(
    muscleGroup: iMuscleGroup | iMuscleGroup[]
  ): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }
}
