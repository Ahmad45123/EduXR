import { useFirebaseApp, useFirestore } from 'reactfire';
import { ExperimentState, SceneObjectState, SceneState } from './types';
import { doc, collection, Firestore } from 'firebase/firestore';
import { experimentConverter, sceneConverter, sceneObjectConverter } from './converters';

export function getExperimentDocRef(fs: Firestore, expName: string) {
  return doc(fs, 'experiments', expName).withConverter(experimentConverter);
}

export function getScenesCollectionRef(fs: Firestore, expName: string) {
  return collection(fs, 'experiments', expName, 'scenes').withConverter(sceneConverter);
}

export function getSceneDocRef(fs: Firestore, expName: string, sceneName: string) {
  return doc(fs, 'experiments', expName, 'scenes', sceneName).withConverter(
    sceneConverter,
  );
}

export function getSceneObjectsCollectionRef(
  fs: Firestore,
  expName: string,
  sceneName: string,
) {
  return collection(
    fs,
    'experiments',
    expName,
    'scenes',
    sceneName,
    'objects',
  ).withConverter(sceneObjectConverter);
}

export function getSceneObjectDocRef(
  fs: Firestore,
  expName: string,
  sceneName: string,
  objectName: string,
) {
  return doc(
    fs,
    'experiments',
    expName,
    'scenes',
    sceneName,
    'objects',
    objectName,
  ).withConverter(sceneObjectConverter);
}
