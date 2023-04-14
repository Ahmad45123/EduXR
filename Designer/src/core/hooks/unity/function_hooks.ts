import * as React from 'react';
import { UnityContext } from '../../../app';
import { SceneObjectState } from '../../states/experiment_store';

export function useUnityObjectManagement() {
  const unityContext = React.useContext(UnityContext);

  function createObject(object: SceneObjectState) {
    unityContext?.sendMessage('SceneController', 'CreateObject', object.objectName);
  }

  function deleteObject(objectName: string) {
    unityContext?.sendMessage('SceneController', 'DeleteObject', objectName);
  }

  return {
    createObject,
    deleteObject,
  };
}
