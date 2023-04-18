import { Unity, useUnityContext } from 'react-unity-webgl';
import * as React from 'react';
import { UnityContext } from '../../app';
import useUnityAndDbSync from '../../core/hooks/useUnityAndDbSync';

type props = {
  style?: React.CSSProperties | undefined;
  expName: string;
  sceneName: string;
};

function UnityAndDbSyncComp({
  expName,
  sceneName,
}: {
  expName: string;
  sceneName: string;
}) {
  useUnityAndDbSync(expName, sceneName);
  return <></>;
}

export default function UnityViewer({ style, expName, sceneName }: props) {
  const unityContext = React.useContext(UnityContext);

  return (
    <>
      <Unity tabIndex={2} unityProvider={unityContext.unityProvider} style={style} />
      {unityContext.isLoaded && (
        <UnityAndDbSyncComp expName={expName} sceneName={sceneName} />
      )}
    </>
  );
}
