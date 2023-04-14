import * as React from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/root_store';
import { UnityContext } from '../../app';
import { useUnityObjectManagement } from './unity/function_hooks';
import { SceneObjectState } from '../states/types';
import { addSceneObject } from '../states/experiment_store';

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
    dispatch(addSceneObject({ sceneName: sceneName, objectName: name }));
    const object = scene?.objects.find(object => object.objectName === name);
    if (object) {
      unityObjectManager.createObject(object);
    }
  }

  function deleteObject() {}

  function getObject(objectName: string): SceneObjectInterface {
    const object = scene?.objects.find(object => object.objectName === objectName);

    function setPosition() {}

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
