import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SceneManager from './routes/scene_manager';
import { initializeApp } from '@firebase/app';
import React from 'react';
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
  Skeleton,
  theme,
} from '@chakra-ui/react';
import Scene from './routes/Scene/scene';
import { useUnityContext } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import {
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from 'reactfire';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneManager />,
  },
  {
    path: '/experiment/:expName/:sceneName',
    element: <Scene />,
  },
]);

export const UnityContext = React.createContext<UnityContextHook>(null!);

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

  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);
  const storageInstance = getStorage(firebaseApp);

  return (
    <Container width="100vw" height="100vh">
      <UnityContext.Provider value={unityContext}>
        <StorageProvider sdk={storageInstance}>
          <FirestoreProvider sdk={firestoreInstance}>
            <ColorModeScript />
            <ChakraProvider theme={theme}>
              <React.Suspense fallback={<Skeleton />}>
                <RouterProvider router={router} />
              </React.Suspense>
            </ChakraProvider>
          </FirestoreProvider>
        </StorageProvider>
      </UnityContext.Provider>
    </Container>
  );
}
