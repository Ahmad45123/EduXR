import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { createEditor, useRete, BaseConnection, BaseNode } from '../logic_designer';
import UnityViewer from '../unity_viewer';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ClassicPreset } from 'rete';
import { SearchIcon } from '@chakra-ui/icons';
import * as React from 'react';
import { SceneType } from '../eduxr_types';
import { AppContext } from '../app';
import { useParams } from 'react-router-dom';

export default function Scene() {
  const { appdata, setAppdata } = React.useContext(AppContext);
  const { sceneName } = useParams();

  const [curScene, setCurScene] = useState<SceneType | undefined>();
  useEffect(() => {
    if (sceneName) {
      setCurScene(appdata.scenes.find(scene => scene.name === sceneName));
    }
  }, [sceneName]);

  const [setContainer, editor] = useRete(createEditor);
  const logicDesignerRef = useRef(null);
  useEffect(() => {
    if (logicDesignerRef.current) {
      setContainer(logicDesignerRef.current);
    }
  }, [logicDesignerRef.current]);

  return (
    <Box
      display="flex"
      gap="4"
      width="100%"
      minHeight="100vh"
      justifyContent="space-between"
      padding="1em"
    >
      <Box width="50%">
        <Tabs width="100%" height="100%">
          <TabList>
            <Tab>Scene Objects</Tab>
            <Tab>Scene Logic</Tab>
          </TabList>
          <TabPanels width="100%" height="100%">
            <TabPanel></TabPanel>
            <TabPanel width="100%" height="100%">
              <div ref={logicDesignerRef} style={{ width: '100%', height: '100%' }}></div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box width="50%" alignSelf="center">
        <UnityViewer style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}
