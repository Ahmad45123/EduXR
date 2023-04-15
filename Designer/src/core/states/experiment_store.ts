import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BaseNode, BaseConnection } from '../../components/logic_designer';
import { ExperimentState, SceneObjectState } from './types';

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
        object: SceneObjectState;
      }>,
    ) => {
      const scene = state.scenes.find(scene => scene.name === action.payload.sceneName);
      if (scene) {
        scene.objects.push(action.payload.object);
      }
    },
    setSceneObjectPosition: (
      state,
      action: PayloadAction<{
        sceneName: string;
        objectName: string;
        position: [number, number, number];
      }>,
    ) => {
      const scene = state.scenes.find(scene => scene.name === action.payload.sceneName);
      if (scene) {
        const object = scene.objects.find(
          object => object.objectName === action.payload.objectName,
        );
        if (object) {
          object.position = action.payload.position;
        }
      }
    },
  },
});

export const { addScene, addSceneObject, setSceneObjectPosition } =
  experimentSlice.actions;

export default experimentSlice.reducer;
