import UnityViewer from '@/modules/unity_viewer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <div className="flex gap-4 w-full">
        <div className="w-1/8">
          <Button variant="contained">Move Right</Button>
        </div>
        <div className="w-3/4">
          <UnityViewer className="w-full" />
        </div>
      </div>
    </main>
  );
}
