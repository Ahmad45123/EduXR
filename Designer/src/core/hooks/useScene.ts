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
import { deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  ExportedNode,
  ExportedNodes,
} from '../../components/logic_designer/node_exporter';

export interface SceneObjectInterface {
  object: SceneObjectState | undefined;
  setPosition: (position: [number, number, number]) => void;
  setRotation: (rotation: [number, number, number]) => void;
  setScale: (scale: [number, number, number]) => void;
  setHasGravity: (hasGravity: boolean) => void;
  setGrabbable: (isGrabbable: boolean) => void;
  setColor: (color: string) => void;
  deleteSelf: () => void;
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
      color: '#00FF00',
      position: [0, 0.28, 0],
      rotation: [0, 0, 0],
      scale: [0.08, 0.08, 0.08],
      hasGravity: false,
      isGrabbable: true,
    };

    setDoc(getSceneObjectDocRef(fsapp, expName, sceneName, name), obj);
  }

  function setSceneLogic(nodes: ExportedNodes) {
    console.dir(nodes);
    updateDoc(getSceneDocRef(fsapp, expName, sceneName), {
      // @ts-ignore
      sceneLogic: nodes,
    });
  }

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

    function setColor(color: string) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        color: color,
      });
    }

    function deleteSelf() {
      deleteDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName));
    }

    return {
      object,
      setPosition,
      setRotation,
      setScale,
      setHasGravity,
      setGrabbable,
      setColor,
      deleteSelf,
    };
  }

  return {
    scene,
    objects,
    addObject,
    setSceneLogic,
    getObject,
  };
}
