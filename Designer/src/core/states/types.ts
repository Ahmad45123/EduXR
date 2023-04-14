import { BaseNode, BaseConnection } from '../../components/logic_designer';

export type SceneObjectType = 'cube' | 'sphere' | 'cylinder' | 'plane' | 'capsule';

export interface SceneObjectState {
  objectName: string;
  objectType: SceneObjectType;
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
