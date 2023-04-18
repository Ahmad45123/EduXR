import { BaseNode, BaseConnection } from '../../components/logic_designer';

export interface SceneObjectState {
  objectName: string;
  objectType: string;
  color: string;
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
}

export interface ExperimentState {
  name: string;
}
