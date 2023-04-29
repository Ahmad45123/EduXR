import { useContext, useEffect, useState } from 'react';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { useFirestore, useFirestoreCollection } from 'reactfire';
import { ObjectTypesManagerContext } from '../../routes/experiment_root';
import { getSceneObjectsCollectionRef } from '../states/references';
import { SceneObjectState } from '../states/types';
import { useUnityObjectManagement } from './unity/function_hooks';

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

          if (newObj.rotation !== oldObj.rotation) {
            unityObjectManager.setObjectRotation(
              newObj.objectName,
              newObj.rotation[0],
              newObj.rotation[1],
              newObj.rotation[2],
            );
          }

          if (newObj.scale !== oldObj.scale) {
            unityObjectManager.setObjectScale(
              newObj.objectName,
              newObj.scale[0],
              newObj.scale[1],
              newObj.scale[2],
            );
          }

          if (newObj.color !== oldObj.color) {
            unityObjectManager.setObjectColor(newObj.objectName, newObj.color);
          }

          break;
      }
    }
    setObjectsList(dataStore.data.docs.map(doc => doc.data()));
  }, [dataStore]);
}
