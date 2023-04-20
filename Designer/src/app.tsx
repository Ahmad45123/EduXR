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
import ExperimentRoot from './routes/experiment_root';

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

export const EduXRContext = React.createContext<{
  username: string;
}>(null!);

export default function App() {
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);
  const storageInstance = getStorage(firebaseApp);

  return (
    <Container width="100vw" height="100vh">
      <EduXRContext.Provider value={{ username: 'mainuser' }}>
        <StorageProvider sdk={storageInstance}>
          <FirestoreProvider sdk={firestoreInstance}>
            <ExperimentRoot>
              <ColorModeScript />
              <ChakraProvider theme={theme}>
                <React.Suspense fallback={<Skeleton />}>
                  <RouterProvider router={router} />
                </React.Suspense>
              </ChakraProvider>
            </ExperimentRoot>
          </FirestoreProvider>
        </StorageProvider>
      </EduXRContext.Provider>
    </Container>
  );
}