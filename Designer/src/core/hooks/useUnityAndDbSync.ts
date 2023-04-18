import { useFirestore, useFirestoreCollection } from 'reactfire';
import { getSceneObjectsCollectionRef } from '../states/references';
import { useEffect, useState } from 'react';
import { useUnityObjectManagement } from './unity/function_hooks';
import { SceneObjectState } from '../states/types';

export default function useUnityAndDbSync(expName: string, sceneName: string) {
  const fsapp = useFirestore();
  const dataStore = useFirestoreCollection(
    getSceneObjectsCollectionRef(fsapp, expName, sceneName),
  );

  const unityObjectManager = useUnityObjectManagement();

  const [objectsList, setObjectsList] = useState<SceneObjectState[]>([]);

  useEffect(() => {
    for (let change of dataStore.data.docChanges()) {
      switch (change.type) {
        case 'added':
          const obj = change.doc.data();
          unityObjectManager.createObject(obj);
          break;
        case 'removed':
          unityObjectManager.deleteObject(change.doc.data().objectName);
          break;
        case 'modified':
          const oldObj = objectsList[change.oldIndex];
          const newObj = change.doc.data();

          if (newObj.position !== oldObj.position) {
            unityObjectManager.setObjectPosition(
              newObj.objectName,
              newObj.position[0],
              newObj.position[1],
              newObj.position[2],
            );
          }
          break;
      }
    }
    setObjectsList(dataStore.data.docs.map(doc => doc.data()));
  }, [dataStore]);
}
