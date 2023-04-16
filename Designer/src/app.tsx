import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SceneManager from './routes/scene_manager';
import { initializeApp } from '@firebase/app';
import { getStorage } from '@firebase/storage';
import React from 'react';
import { Box, ChakraProvider, ColorModeScript, Container, theme } from '@chakra-ui/react';
import Scene from './routes/Scene/scene';
import { store } from './core/states/root_store';
import { Provider } from 'react-redux';
import { useUnityContext } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneManager />,
  },
  {
    path: '/scene/:sceneName',
    element: <Scene />,
  },
]);

const firebaseConfig = {
  apiKey: 'AIzaSyBwscW0OfHmQ9IvDcaNEdUrrBkLL2uLo1Q',
  authDomain: 'eduvr-fd56d.firebaseapp.com',
  projectId: 'eduvr-fd56d',
  storageBucket: 'eduvr-fd56d.appspot.com',
  messagingSenderId: '947278970521',
  appId: '1:947278970521:web:f6a61faed80a6ed5d30208',
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);

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
    <Container width="100vw" height="100vh">
      <UnityContext.Provider value={unityContext}>
        <Provider store={store}>
          <ColorModeScript />
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </Provider>
      </UnityContext.Provider>
    </Container>
  );
}
