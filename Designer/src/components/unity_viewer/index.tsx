import { Unity, useUnityContext } from 'react-unity-webgl';
import * as React from 'react';
import { UnityContext } from '../../app';

type props = {
  style?: React.CSSProperties | undefined;
};

export default function UnityViewer({ style }: props) {
  const unityContext = React.useContext(UnityContext);
  if (unityContext != null)
    return (
      <Unity tabIndex={2} unityProvider={unityContext.unityProvider} style={style} />
    );
  else {
    return <div></div>;
  }
}
