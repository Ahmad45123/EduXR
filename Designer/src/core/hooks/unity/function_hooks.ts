import * as React from 'react';
import { SceneObjectState } from '../../states/types';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';

export function useUnityObjectManagement({
  unityContext,
}: {
  unityContext: UnityContextHook;
}) {
  const createObject = React.useCallback(
    (object: SceneObjectState) => {
      unityContext.sendMessage('SceneController', 'CreateObject', JSON.stringify(object));
    },
    [unityContext],
  );

  const setObjectPosition = React.useCallback(
    (objectName: string, x: number, y: number, z: number) => {
      unityContext.sendMessage(
        'SceneController',
        'SetObjectPosition',
        JSON.stringify({ objectName, x, y, z }),
      );
    },
    [unityContext],
  );

  const deleteObject = React.useCallback(
    (objectName: string) => {
      unityContext.sendMessage('SceneController', 'DeleteObject', objectName);
    },
    [unityContext],
  );

  return {
    createObject,
    deleteObject,
    setObjectPosition,
  };
}
