import { BaseNode, BaseConnection } from '../../components/logic_designer';

export type SceneObjectType = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'custom';

export interface SceneObjectState {
  objectName: string;
  objectType: SceneObjectType;
  objectObjPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  hasGravity: boolean;
  isGrabbable: boolean;
}

export interface SceneState {
  name: string;
  sceneLogic?: {
    nodes: BaseNode[];
    connections: BaseConnection[];
  };
  objects: SceneObjectState[];
}

export interface ExperimentState {
  name: string;
  scenes: SceneState[];
}
