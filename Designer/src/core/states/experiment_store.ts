import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BaseNode, BaseConnection } from '../../components/logic_designer';

export interface SceneObjectState {
  objectName: string;
  objectType: string;
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

const initialState: ExperimentState = {
  name: 'My Experiment',
  scenes: [],
};

export const experimentSlice = createSlice({
  name: 'experiment',
  initialState,
  reducers: {
    addScene: (state, action: PayloadAction<string>) => {
      state.scenes.push({
        name: action.payload,
        objects: [],
      });
    },
    addSceneObject: (
      state,
      action: PayloadAction<{
        sceneName: string;
        objectName: string;
      }>,
    ) => {
      const scene = state.scenes.find(scene => scene.name === action.payload.sceneName);
      if (scene) {
        scene.objects.push({
          objectName: action.payload.objectName,
          objectType: 'cube',
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          hasGravity: true,
          isGrabbable: true,
        });
      }
    },
  },
});

export const { addScene, addSceneObject } = experimentSlice.actions;

export default experimentSlice.reducer;
