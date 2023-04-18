import * as React from 'react';
import { useUnityObjectManagement } from './unity/function_hooks';
import { SceneObjectState } from '../states/types';
import {
  getSceneDocRef,
  getSceneObjectDocRef,
  getSceneObjectsCollectionRef,
} from '../states/references';
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from 'reactfire';
import { setDoc, updateDoc } from 'firebase/firestore';

export interface SceneObjectInterface {
  object: SceneObjectState | undefined;
  setPosition: (position: [number, number, number]) => void;
  setRotation: (rotation: [number, number, number]) => void;
  setScale: (scale: [number, number, number]) => void;
  setHasGravity: (hasGravity: boolean) => void;
  setGrabbable: (isGrabbable: boolean) => void;
}

export default function useScene(expName: string, sceneName: string) {
  const fsapp = useFirestore();
  const { data: scene } = useFirestoreDocData(getSceneDocRef(fsapp, expName, sceneName));
  const { data: objects } = useFirestoreCollectionData(
    getSceneObjectsCollectionRef(fsapp, expName, sceneName),
  );

  function addObject(name: string, type: string) {
    const obj: SceneObjectState = {
      objectName: name,
      objectType: type,
      position: [0, 0.28, 0],
      rotation: [0, 0, 0],
      scale: [0.08, 0.08, 0.08],
      hasGravity: false,
      isGrabbable: true,
    };

    setDoc(getSceneObjectDocRef(fsapp, expName, sceneName, name), obj);
  }

  function deleteObject() {}

  function getObject(objectName: string): SceneObjectInterface {
    const object = objects.find(object => object.objectName === objectName);

    function setPosition(position: [number, number, number]) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        position: position,
      });
    }

    function setScale(scale: [number, number, number]) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        scale: scale,
      });
    }

    function setRotation(rotation: [number, number, number]) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        rotation: rotation,
      });
    }

    function setHasGravity(hasGravity: boolean) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        hasGravity: hasGravity,
      });
    }

    function setGrabbable(isGrabbable: boolean) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        isGrabbable: isGrabbable,
      });
    }

    return {
      object,
      setPosition,
      setRotation,
      setScale,
      setHasGravity,
      setGrabbable,
    };
  }

  return {
    scene,
    objects,
    addObject,
    deleteObject,
    getObject,
  };
}
