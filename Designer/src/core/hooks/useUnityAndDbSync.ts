import { useFirestore, useFirestoreCollection } from 'reactfire';
import { getSceneObjectsCollectionRef } from '../states/references';
import { useEffect, useState, useContext } from 'react';
import { useUnityObjectManagement } from './unity/function_hooks';
import { SceneObjectState } from '../states/types';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { ObjectTypesManagerContext } from '../../routes/experiment_root';

type props = {
  unityContext: UnityContextHook;
  expName: string;
  sceneName: string;
};

export default function useUnityAndDbSync({ unityContext, expName, sceneName }: props) {
  const fsapp = useFirestore();
  const dataStore = useFirestoreCollection(
    getSceneObjectsCollectionRef(fsapp, expName, sceneName),
  );

  const unityObjectManager = useUnityObjectManagement({
    unityContext,
  });

  const objectTypeManager = useContext(ObjectTypesManagerContext);

  const [objectsList, setObjectsList] = useState<SceneObjectState[]>([]);

  useEffect(() => {
    for (let change of dataStore.data.docChanges()) {
      switch (change.type) {
        case 'added':
          const obj = change.doc.data();
          const model = objectTypeManager.objects.find(o => o.name === obj.objectType);
          if (model) {
            unityObjectManager.setObjectModelURL(
              obj.objectType,
              model.objFile,
              model.mtlFile,
            );
          }
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
