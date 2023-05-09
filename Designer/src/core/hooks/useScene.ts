import { deleteDoc,setDoc,updateDoc } from 'firebase/firestore';
import { useFirestore,useFirestoreCollectionData,useFirestoreDocData } from 'reactfire';
import { ExportedNodes } from '../../components/logic_designer/node_exporter';
import {
getSceneDocRef,
getSceneObjectDocRef,
getSceneObjectsCollectionRef
} from '../states/references';
import { SceneObjectState } from '../states/types';


export interface SceneObjectInterface {
  object: SceneObjectState | undefined;
  setPosition: (position: [number, number, number]) => void;
  setRotation: (rotation: [number, number, number]) => void;
  setScale: (scale: [number, number, number]) => void;
  setHasGravity: (hasGravity: boolean) => void;
  setGrabbable: (isGrabbable: boolean) => void;
  setColor: (color: string) => void;
  deleteSelf: () => void;
  setShowDesc: (showDesc: boolean) => void;
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
      showDesc: true,
    };

    setDoc(getSceneObjectDocRef(fsapp, expName, sceneName, name), obj);
  }

  function setSceneLogic(nodes: ExportedNodes) {
    updateDoc(getSceneDocRef(fsapp, expName, sceneName), {
      // @ts-ignore
      sceneLogic: nodes,
    });
  }

  function setDescription(description: string) {
    updateDoc(getSceneDocRef(fsapp, expName, sceneName), {
      description: description,
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

    function setShowDesc(showDesc: boolean) {
      updateDoc(getSceneObjectDocRef(fsapp, expName, sceneName, objectName), {
        showDesc: showDesc,
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
      setShowDesc,
    };
  }

  return {
    scene,
    objects,
    addObject,
    setSceneLogic,
    getObject,
    setDescription,
  };
}
