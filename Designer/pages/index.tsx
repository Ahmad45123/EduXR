import { createEditor, useRete } from '@/modules/logic_designer';
import UnityViewer from '@/modules/unity_viewer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
} from '@mui/material';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ClassicPreset } from 'rete';

type Scene = {
  name: string;
  sceneLogic?: {
    nodes: ClassicPreset.Node[];
    connections: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>[];
  };
};

const logicDesignerStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function Home() {
  const [scenes, setScenes] = useState<Scene[]>([]);

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    setScenes([...scenes, { name: sceneName! }]);
  };

  const [isLogicEditorVisible, setLogicEditorVisibility] = useState(false);

  const [curScene, setCurScene] = useState<string>('');
  const showLogicDesigner = (scene: Scene) => {
    setLogicEditorVisibility(true);
    setCurScene(scene.name);
    if (scene.sceneLogic) {
      editor!.importSceneState(scene.sceneLogic.nodes, scene.sceneLogic.connections);
    }
  };

  const closeLogicDesigner = () => {
    // save scene logic
    const sceneLogic = editor!.exportSceneState();
    const scene = scenes.find(scene => scene.name === curScene);
    if (scene) {
      scene.sceneLogic = sceneLogic;
    }

    setScenes([...scenes.filter(scene => scene.name !== curScene), scene!]);
    setLogicEditorVisibility(false);
  };

  const [setContainer, editor] = useRete(createEditor);
  const logicDesignerRef = useCallback(
    (ref: any) => {
      setContainer(ref);
    },
    [setContainer],
  );

  return (
    <main className="flex gap-4 w-full min-h-screen justify-between p-4">
      <Modal open={isLogicEditorVisible} onClose={closeLogicDesigner}>
        <Card sx={logicDesignerStyle}>
          <div ref={logicDesignerRef} style={{ width: '100%', height: '100%' }}></div>
        </Card>
      </Modal>

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
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => showLogicDesigner(scene)}
                    >
                      <SearchIcon />
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
