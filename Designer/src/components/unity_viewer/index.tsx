import * as React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import useUnityAndDbSync from '../../core/hooks/useUnityAndDbSync';

type props = {
  style?: React.CSSProperties | undefined;
  expName: string;
  sceneName: string;
};

function UnityAndDbSyncComp({
  unityContext,
  expName,
  sceneName,
}: {
  unityContext: UnityContextHook;
  expName: string;
  sceneName: string;
}) {
  useUnityAndDbSync({
    unityContext,
    expName,
    sceneName,
  });
  return <></>;
}

export default function UnityViewer({ style, expName, sceneName }: props) {
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
    <>
      <Unity tabIndex={2} unityProvider={unityContext.unityProvider} style={style} />
      {unityContext.isLoaded && (
        <UnityAndDbSyncComp
          unityContext={unityContext}
          expName={expName}
          sceneName={sceneName}
        />
      )}
    </>
  );
}
