import { iList } from '../../src/@types/workout';
import {
  iCreateMuscleGroup,
  iMuscleGroup,
} from '../../src/core/Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../src/core/Repositories/iMuscleGroup.Repository';
import UseCaseCreateMuscleGroup from '../../src/core/UseCases/MuscleGroup/CreateMuscleGroup';

test('should create a muscle group', async () => {
  const newMuscleGroup = {
    id: 1,
    name: 'quads',
    description_name: 'quadríceps',
  };

  const muscleGroupRepository: iMuscleGroupRepository = {
    createMuscleGroup: function (
      muscleGroup: iMuscleGroup
    ): Promise<iMuscleGroup> {
      return Promise.resolve(muscleGroup);
    },
    findAll: function (params?: any): Promise<iList<iMuscleGroup>> {
      throw new Error('Function not implemented.');
    },
    findById: function (id: number): Promise<iMuscleGroup | null> {
      throw new Error('Function not implemented.');
    },
    findByName: function (params: iCreateMuscleGroup): Promise<iMuscleGroup[]> {
      throw new Error('Function not implemented.');
    },
    saveMuscleGroup: function (
      muscleGroup: iMuscleGroup
    ): Promise<iMuscleGroup> {
      throw new Error('Function not implemented.');
    },
    deleteMuscleGroup: function (muscleGroup: iMuscleGroup): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

  const useCaseCreateMuscleGroup: UseCaseCreateMuscleGroup =
    new UseCaseCreateMuscleGroup(muscleGroupRepository);

  const savedMuscleGroup: iMuscleGroup = await useCaseCreateMuscleGroup.execute(
    newMuscleGroup
  );

  expect(savedMuscleGroup.id).toBe(newMuscleGroup.id);
  expect(savedMuscleGroup.name).toBeNaN();
});
