import ExerciseEntity from '../database/typeorm/Entities/Exercise';

function removeCircularReferences(key: string, value: any, keyName: string) {
  if (key === keyName && value instanceof ExerciseEntity) {
    return undefined; // ou null
  }
  return value;
}

export function removeCircularReferencesExercise(key: string, value: any) {
  return removeCircularReferences(key, value, 'exercise');
}
