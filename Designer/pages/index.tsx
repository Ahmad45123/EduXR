import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Unity, useUnityContext } from "react-unity-webgl";

const inter = Inter({ subsets: ['latin'] })

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

  return (
    <main className='bg-white w-full h-full'>
      <div className='flex'>
        <div>

        </div>
        <div>
          <Unity unityProvider={unityProvider} />
        </div>
      </div>
    </main>
  )
}
