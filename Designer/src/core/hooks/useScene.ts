import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/root_store';
import { useUnityObjectManagement } from './unity/function_hooks';
import { SceneObjectState } from '../states/types';
import { addSceneObject, setSceneObjectPosition } from '../states/experiment_store';

export interface SceneObjectInterface {
  object: SceneObjectState | undefined;
  setPosition: (position: [number, number, number]) => void;
  setRotation: (rotation: [number, number, number]) => void;
}

export default function useScene(sceneName: string) {
  const scene = useSelector((state: RootState) =>
    state.experiment.scenes.find(scene => scene.name === sceneName),
  );
  const dispatch = useDispatch();

  const unityObjectManager = useUnityObjectManagement();

  function addObject(name: string) {
    const obj: SceneObjectState = {
      objectName: name,
      objectType: 'cube',
      objectObjPath: '',
      objectMtlPath: '',
      position: [0, 0.28, 0],
      rotation: [0, 0, 0],
      scale: [0.08, 0.08, 0.08],
      hasGravity: false,
      isGrabbable: true,
    };

    unityObjectManager.createObject(obj);
    dispatch(addSceneObject({ sceneName: sceneName, object: obj }));
  }

  function deleteObject() {}

  function getObject(objectName: string): SceneObjectInterface {
    const object = scene?.objects.find(object => object.objectName === objectName);

    function setPosition(position: [number, number, number]) {
      unityObjectManager.setObjectPosition(
        objectName,
        position[0],
        position[1],
        position[2],
      );
      dispatch(setSceneObjectPosition({ sceneName, objectName, position }));
    }

    function setRotation() {}

    return {
      object,
      setPosition,
      setRotation,
    };
  }

  return {
    scene,
    addObject,
    deleteObject,
    getObject,
  };
}
