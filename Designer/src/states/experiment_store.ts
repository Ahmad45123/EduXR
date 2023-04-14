import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BaseNode, BaseConnection } from '../logic_designer';

export interface SceneObjectState {
  objectName: string;
  positon: [number, number, number];
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
  },
});

export const { addScene } = experimentSlice.actions;

export default experimentSlice.reducer;
