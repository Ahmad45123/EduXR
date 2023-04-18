import * as React from 'react';
import {
  ObjectTypesManager,
  useObjectTypesManager,
} from '../core/hooks/useObjectTypesManager';

export const ObjectTypesManagerContext = React.createContext<ObjectTypesManager>(null!);

export default function ExperimentRoot(props: any) {
  const objectTypesManager = useObjectTypesManager();

  return (
    <ObjectTypesManagerContext.Provider value={objectTypesManager}>
      {props.children}
    </ObjectTypesManagerContext.Provider>
  );
}
