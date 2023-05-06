import { setDoc } from '@firebase/firestore';
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire';
import {
  getExperimentDocRef,
  getSceneDocRef,
  getScenesCollectionRef,
} from '../states/references';

export default function useExperiment(expName: string) {
  const fsapp = useFirestore();
  const { data: experiment } = useFirestoreDocData(getExperimentDocRef(fsapp, expName));
  const { data: scenes } = useFirestoreCollectionData(
    getScenesCollectionRef(fsapp, expName),
  );

    function createSelf() {
      const experimentRef = getExperimentDocRef(fsapp, expName);
      setDoc(experimentRef, {
        name: expName,
      });
    }

    function createScene(name: string) {
      createSelf();

      let nextIndex = scenes.length + 1;
      const sceneRef = getSceneDocRef(fsapp, expName, name);
      setDoc(sceneRef, {
        name,
        description: '',
        index: nextIndex,
      });
    }

    return {
      experiment,
      scenes,
      createScene,
      createSelf,
    };
}
