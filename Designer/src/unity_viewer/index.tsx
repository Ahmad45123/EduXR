import { Unity, useUnityContext } from 'react-unity-webgl';
import * as React from 'react';

type props = {
  style?: React.CSSProperties | undefined;
};

export default function UnityViewer({ style }: props) {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: 'renderer/Build/renderer.loader.js',
    dataUrl: 'renderer/Build/renderer.data',
    frameworkUrl: 'renderer/Build/renderer.framework.js',
    codeUrl: 'renderer/Build/renderer.wasm',
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'EduXRDesigner',
    productVersion: '0.1',
  });

  return <Unity unityProvider={unityProvider} style={style} />;
}
