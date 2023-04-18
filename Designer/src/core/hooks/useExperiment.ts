import * as React from 'react';
import { useUnityContext } from 'react-unity-webgl';
import {
  getExperimentDocRef,
  getSceneDocRef,
  getScenesCollectionRef,
} from '../states/references';
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire';
import { setDoc } from '@firebase/firestore';

export default function useExperiment(expName: string) {
  const fsapp = useFirestore();
  const { data: experiment } = useFirestoreDocData(getExperimentDocRef(fsapp, expName));
  const { data: scenes } = useFirestoreCollectionData(
    getScenesCollectionRef(fsapp, expName),
  );

  function createScene(name: string) {
    const sceneRef = getSceneDocRef(fsapp, expName, name);
    setDoc(sceneRef, {
      name,
    });
  }

  return {
    experiment,
    scenes,
    createScene,
  };
}
