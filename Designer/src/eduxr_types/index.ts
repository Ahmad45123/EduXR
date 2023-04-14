import { BaseNode, BaseConnection } from '../logic_designer';

export type SceneType = {
  name: string;
  sceneLogic?: {
    nodes: BaseNode[];
    connections: BaseConnection[];
  };
  objects: SceneObjectType[];
};

export type SceneObjectType = {
  objectName: string;
  positon: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  hasGravity: boolean;
  isGrabbable: boolean;
};