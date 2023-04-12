import {
  Box,
  Button,
  Card,
  CardBody,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { createEditor, useRete, BaseConnection, BaseNode } from '../logic_designer';
import UnityViewer from '../unity_viewer';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ClassicPreset } from 'rete';
import { SearchIcon } from '@chakra-ui/icons';
import * as React from 'react';

type Scene = {
  name: string;
  sceneLogic?: {
    nodes: BaseNode[];
    connections: BaseConnection[];
  };
};

export default function Scene() {
  const [scenes, setScenes] = useState<Scene[]>([]);

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    setScenes([...scenes, { name: sceneName! }]);
  };

  const [isLogicEditorVisible, setLogicEditorVisibility] = useState(false);

  const [curScene, setCurScene] = useState<string>('');
  const showLogicDesigner = async (scene: Scene) => {
    setLogicEditorVisibility(true);
    setCurScene(scene.name);
    await editor?.clearEditor();
    if (scene.sceneLogic) {
      await editor?.importSceneState(
        scene.sceneLogic.nodes,
        scene.sceneLogic.connections,
      );
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
    <Box
      display="flex"
      gap="4"
      width="100%"
      minHeight="100vh"
      justifyContent="space-between"
      padding="1em"
    >
      <Modal isOpen={isLogicEditorVisible} onClose={closeLogicDesigner}>
        <ModalOverlay />
        <ModalContent minW="90%" height="86%">
          <div ref={logicDesignerRef} style={{ width: '100%', height: '100%' }}></div>
        </ModalContent>
      </Modal>

      <Box width="50%">
        <Card height="100%">
          <CardBody>
            <Button onClick={addScene}>Create Scene</Button>
            <List width="100%">
              {scenes.map(scene => (
                <ListItem display="flex" gap="1em" mt="1em" key={scene.name}>
                  <Text alignSelf="center">{scene.name}</Text>
                  <IconButton
                    aria-label="delete"
                    onClick={() => showLogicDesigner(scene)}
                    icon={<SearchIcon />}
                  />
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      </Box>
      <Box width="75%" alignSelf="center">
        <UnityViewer style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}
