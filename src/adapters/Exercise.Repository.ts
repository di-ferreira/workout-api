import { Repository } from 'typeorm';
import { iList, SearchParams } from '../@types/workout';
import { iEquipment } from '../core/Entities/iEquipment';
import { iExercise } from '../core/Entities/iExercise';
import { iImageExercise } from '../core/Entities/iImageExercise';
import { iMuscleGroup } from '../core/Entities/iMuscleGroup';
import { iExerciceRepository } from '../core/Repositories/iExercise.Repository';
import { AppDataSource } from '../infra/database/typeorm/AppDataSource';
import EquipmentEntity from '../infra/database/typeorm/Entities/Equipment';
import ExerciseEntity from '../infra/database/typeorm/Entities/Exercise';
import ImageExerciseEntity from '../infra/database/typeorm/Entities/ImageExercise';
import MuscleGroupEntity from '../infra/database/typeorm/Entities/MuscleGroup';

export class ExerciceRepository implements iExerciceRepository {
  private CustomRepository: Repository<ExerciseEntity>;

  constructor() {
    this.CustomRepository = AppDataSource.getRepository(ExerciseEntity);
  }

  async createExercice(exercise: iExercise): Promise<iExercise> {
    const newExercise = new ExerciseEntity();

    const equipments: iEquipment[] = exercise.equipment.map((equipment) => {
      const eq: iEquipment = equipment as iEquipment;
      const newEquipment = new EquipmentEntity();
      newEquipment.name = eq.name;
      newEquipment.description_name = eq.description_name;
      eq.id && (newEquipment.id = eq.id);
      return newEquipment;
    });

    const muscleGroups: iMuscleGroup[] = exercise.muscle_group.map((group) => {
      const muscleGroup: iMuscleGroup = group as iMuscleGroup;
      const newMuscleGroup = new MuscleGroupEntity();
      newMuscleGroup.name = muscleGroup.name;
      newMuscleGroup.description_name = muscleGroup.description_name;
      muscleGroup.id && (newMuscleGroup.id = muscleGroup.id);
      return newMuscleGroup;
    });

    const imagesExercise: iImageExercise[] = exercise.images.map((image) => {
      const imageExercise: iImageExercise = image as iImageExercise;
      const newImageExercise = new ImageExerciseEntity();
      newImageExercise.name = imageExercise.name;
      newImageExercise.exercise = newExercise;
      newImageExercise.link = imageExercise.link;
      // imageExercise.id && (newImageExercise.id = imageExercise.id);
      return newImageExercise;
    });

    const substitutes: iExercise[] = exercise.substitutes.map((substitute) => {
      const exerciseSubstitute: iExercise = substitute as iExercise;
      let newExerciseSubstitute = new ExerciseEntity();
      newExerciseSubstitute.name = exerciseSubstitute.name;
      newExerciseSubstitute.description = exerciseSubstitute.description;
      newExerciseSubstitute.instructions = exerciseSubstitute.instructions;
      newExerciseSubstitute.tips = exerciseSubstitute.tips;
      newExerciseSubstitute.equipment =
        exerciseSubstitute.equipment as unknown as iEquipment[];
      newExerciseSubstitute.muscle_group =
        exerciseSubstitute.muscle_group as unknown as iMuscleGroup[];
      newExerciseSubstitute.substitutes =
        exerciseSubstitute.substitutes as unknown as iExercise[];
      exerciseSubstitute.id &&
        (newExerciseSubstitute.id = exerciseSubstitute.id);
      return newExerciseSubstitute;
    });

    newExercise.name = exercise.name;
    newExercise.description = exercise.description;
    newExercise.instructions = exercise.instructions;
    newExercise.tips = exercise.tips;
    newExercise.images = imagesExercise;
    newExercise.equipment = equipments;
    newExercise.muscle_group = muscleGroups;
    newExercise.substitutes = substitutes;

    // const newExercise = this.CustomRepository.create({
    //   name: exercise.name,
    //   description: exercise.description,
    //   equipment: exercise.equipment,
    //   images: exercise.images,
    //   instructions: exercise.instructions,
    //   muscle_group: exercise.muscle_group,
    //   substitutes: exercise.substitutes,
    //   tips: exercise.tips,
    // });

    return await this.CustomRepository.save(newExercise);
  }

  saveExercice(exercise: iExercise): Promise<iExercise> {
    throw new Error('Method not implemented.');
  }

  findAll(params?: SearchParams): Promise<iList<iExercise>> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<iExercise | null> {
    throw new Error('Method not implemented.');
  }

  deleteExercice(exercise: iExercise): Promise<void> {
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
