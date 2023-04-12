import { BaseNode, BaseConnection } from '../logic_designer';

export type SceneType = {
  name: string;
  sceneLogic?: {
    nodes: BaseNode[];
    connections: BaseConnection[];
  };
};
