import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SceneManager from './routes/scene_manager';
import { Updater, useImmer } from 'use-immer';
import React from 'react';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import Scene from './routes/Scene/scene';
import { store } from './states/root_store';
import { Provider } from 'react-redux';
import { useUnityContext } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';

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

export const UnityContext = React.createContext<UnityContextHook | null>(null);

export default function App() {
  const unityContext = useUnityContext({
    loaderUrl: '/renderer/Build/renderer.loader.js',
    dataUrl: '/renderer/Build/renderer.data',
    frameworkUrl: '/renderer/Build/renderer.framework.js',
    codeUrl: '/renderer/Build/renderer.wasm',
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'EduXRDesigner',
    productVersion: '0.1',
  });

  return (
    <UnityContext.Provider value={unityContext}>
      <Provider store={store}>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </UnityContext.Provider>
  );
}
