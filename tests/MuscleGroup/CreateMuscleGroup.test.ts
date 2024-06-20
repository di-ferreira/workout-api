import { iMuscleGroup } from '../../src/core/Entities/MuscleGroup';
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
  };

  const useCaseCreateMuscleGroup: UseCaseCreateMuscleGroup =
    new UseCaseCreateMuscleGroup(muscleGroupRepository);

  const savedMuscleGroup: iMuscleGroup = await useCaseCreateMuscleGroup.execute(
    newMuscleGroup
  );

  expect(savedMuscleGroup.id).toBe(newMuscleGroup.id);
  expect(savedMuscleGroup.name).toBeNaN();
});
