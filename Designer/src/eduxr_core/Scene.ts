import * as React from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/root_store';
import { UnityContext } from '../app';

export default function useScene(sceneName: string) {
  const scene = useSelector((state: RootState) =>
    state.experiment.scenes.find(scene => scene.name === sceneName),
  );
  const dispatch = useDispatch();

  const unityContext = React.useContext(UnityContext);

  function addObject() {}

  function deleteObject() {}

  function getObject(objectName: string) {
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
