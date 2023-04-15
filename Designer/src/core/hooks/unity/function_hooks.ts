import * as React from 'react';
import { UnityContext } from '../../../app';
import { SceneObjectState } from '../../states/types';

export function useUnityObjectManagement() {
  const unityContext = React.useContext(UnityContext);

  function createObject(object: SceneObjectState) {
    if (!unityContext) {
      console.error('Creating new object without unity context.');
      return;
    }
    unityContext.sendMessage('SceneController', 'CreateObject', JSON.stringify(object));
  }

  function setObjectPosition(objectName: string, x: number, y: number, z: number) {
    if (!unityContext) {
      console.error('Setting position without unity context.');
      return;
    }
    unityContext.sendMessage(
      'SceneController',
      'SetObjectPosition',
      JSON.stringify({ objectName, x, y, z }),
    );
  }

  function deleteObject(objectName: string) {
    unityContext?.sendMessage('SceneController', 'DeleteObject', objectName);
  }

  return {
    createObject,
    deleteObject,
    setObjectPosition,
  };
}
