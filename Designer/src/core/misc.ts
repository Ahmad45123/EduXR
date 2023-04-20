import { SceneObjectState } from './states/types';

export function IsPrimitiveObject(object: SceneObjectState) {
  return (
    object.objectType === 'cube' ||
    object.objectType === 'sphere' ||
    object.objectType === 'capsule' ||
    object.objectType === 'cylinder'
  );
}
