import { iList, SearchParams } from '../../../@types/workout';
import { iMuscleGroup } from '../../Entities/iMuscleGroup';
import { iMuscleGroupRepository } from '../../Repositories/iMuscleGroup.Repository';
export default class UseCaseListMuscleGroup {
  constructor(public repository: iMuscleGroupRepository) {}
  async execute(params?: SearchParams): Promise<iList<iMuscleGroup>> {
    return await this.repository.findAll(params);
  }
}
