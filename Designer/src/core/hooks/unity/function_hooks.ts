import * as React from 'react';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { SceneObjectState } from '../../states/types';

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

  const setObjectModelURL = React.useCallback(
    (objectModelName: string, objURL: string, mtlURL: string | undefined) => {
      unityContext.sendMessage(
        'SceneController',
        'SetModelObject',
        JSON.stringify({ objectModelName, objURL, mtlURL }),
      );
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

  const setObjectRotation = React.useCallback(
    (objectName: string, x: number, y: number, z: number) => {
      unityContext.sendMessage(
        'SceneController',
        'SetObjectRotation',
        JSON.stringify({ objectName, x, y, z }),
      );
    },
    [unityContext],
  );

  const setObjectScale = React.useCallback(
    (objectName: string, x: number, y: number, z: number) => {
      unityContext.sendMessage(
        'SceneController',
        'SetObjectScale',
        JSON.stringify({ objectName, x, y, z }),
      );
    },
    [unityContext],
  );

  const setObjectColor = React.useCallback(
    (objectName: string, color: string) => {
      unityContext.sendMessage(
        'SceneController',
        'SetObjectColor',
        JSON.stringify({ objectName, color }),
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
    setObjectModelURL,
    deleteObject,
    setObjectPosition,
    setObjectRotation,
    setObjectScale,
    setObjectColor,
  };
}
