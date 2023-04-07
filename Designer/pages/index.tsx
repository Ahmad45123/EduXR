import { Unity, useUnityContext } from "react-unity-webgl";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from "@mui/material";

export default function Home() {

  const { unityProvider, sendMessage } =
    useUnityContext({
      loaderUrl: "renderer/Build/renderer.loader.js",
      dataUrl: "renderer/Build/renderer.data",
      frameworkUrl: "renderer/Build/renderer.framework.js",
      codeUrl: "renderer/Build/renderer.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "EduXRDesigner",
      productVersion: "0.1",
    });

    function sendToUnity() {
      sendMessage("Cube", "MoveRight");
    }

  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <div className='flex gap-4 w-full'>
        <div className="w-1/8">
          <Button variant="contained" onClick={sendToUnity}>Move Right</Button>
        </div>
        <div className="w-3/4">
          <Unity unityProvider={unityProvider} className="w-full"/>
        </div>
      </div>
    </main>
  )
}
