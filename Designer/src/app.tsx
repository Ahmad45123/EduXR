import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SceneManager from './routes/scene_manager';
import { Updater, useImmer } from 'use-immer';
import { SceneType } from './eduxr_types';
import React from 'react';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import Scene from './routes/scene';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneManager />,
  },
  {
    path: '/scene/:name',
    element: <Scene />,
  },
]);

export const AppContext = React.createContext<{
  appdata: {
    scenes: SceneType[];
  };
  setAppdata: Updater<{
    scenes: SceneType[];
  }>;
}>({
  appdata: {
    scenes: [],
  },
  setAppdata: () => {},
});

export default function App() {
  const [appData, setAppData] = useImmer<{
    scenes: SceneType[];
  }>({
    scenes: [],
  });

  return (
    <AppContext.Provider value={{ appdata: appData, setAppdata: setAppData }}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AppContext.Provider>
  );
}
