import { ExportedNodes } from '../../components/logic_designer/node_exporter';

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
  index: number;
  description: string;
  sceneLogic?: ExportedNodes;
}

export interface ExperimentState {
  name: string;
}
