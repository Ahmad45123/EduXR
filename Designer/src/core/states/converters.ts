import { QueryDocumentSnapshot, DocumentData, SnapshotOptions } from 'firebase/firestore';
import { ExperimentState, SceneObjectState, SceneState } from './types';

export const experimentConverter = {
  toFirestore: (data: ExperimentState) => data,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions | undefined,
  ): ExperimentState => {
    const data = snapshot.data(options);
    return data as ExperimentState;
  },
};

export const sceneConverter = {
  toFirestore: (data: SceneState) => data,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions | undefined,
  ): SceneState => {
    const data = snapshot.data(options);
    return data as SceneState;
  },
};

export const sceneObjectConverter = {
  toFirestore: (data: SceneObjectState) => data,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions | undefined,
  ): SceneObjectState => {
    const data = snapshot.data(options);
    return data as SceneObjectState;
  },
};
