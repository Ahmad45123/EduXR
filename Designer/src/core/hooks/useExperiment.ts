import * as React from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states/root_store';
import { addScene } from '../states/experiment_store';

export default function useExperiment() {
  const experiment = useSelector((state: RootState) => state.experiment);
  const dispatch = useDispatch();

  function createScene(name: string) {
    dispatch(addScene(name));
  }

  return {
    experiment,
    createScene,
  };
}
