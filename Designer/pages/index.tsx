import UnityViewer from '@/modules/unity_viewer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

type Scene = {
  name: string;
};

export default function Home() {
  const [scenes, setScenes] = useState<Scene[]>([]);

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    setScenes([...scenes, { name: sceneName! }]);
  };

  return (
    <main className="flex gap-4 w-full min-h-screen justify-between p-4">
      <div className="w-1/2">
        <Card className="h-full">
          <CardContent>
            <h1 className="text-2xl font-bold">EduXR Designer</h1>

            <Button variant="contained" onClick={addScene}>
              Create Scene
            </Button>
            <List className="w-full">
              {scenes.map(scene => (
                <ListItem key={scene.name}>
                  <ListItemText primary={scene.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
      <div className="w-3/4 self-center">
        <UnityViewer className="w-full" />
      </div>
    </main>
  );
}
