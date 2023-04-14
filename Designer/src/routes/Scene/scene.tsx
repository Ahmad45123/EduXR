import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {
  createEditor,
  useRete,
  BaseConnection,
  BaseNode,
} from '../../components/logic_designer';
import UnityViewer from '../../components/unity_viewer';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ClassicPreset } from 'rete';
import { SearchIcon } from '@chakra-ui/icons';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Vector3Input from '../../components/vector3_input';
import SceneObjectComp from './object_comp';
import useScene from '../../core/hooks/useScene';

export default function Scene() {
  const { sceneName } = useParams();
  const sceneCore = useScene(sceneName!);

  const [setContainer, editor] = useRete(createEditor);
  const logicDesignerRef = useRef(null);
  useEffect(() => {
    if (logicDesignerRef.current) {
      setContainer(logicDesignerRef.current);
    }
  }, [logicDesignerRef.current]);

  const [newObjectName, setNewObjectName] = useState('');
  const createObject = function () {
    sceneCore.addObject(newObjectName);
    setNewObjectName('');
  };

  return (
    <Box
      display="flex"
      gap="4"
      width="100%"
      height="100%"
      justifyContent="space-between"
      padding="1em"
    >
      <Box width="50%" height="100%">
        <Tabs display="flex" flexDir="column" height="100%">
          <TabList>
            <Tab>Scene Objects</Tab>
            <Tab>Scene Logic</Tab>
          </TabList>
          <TabPanels flexGrow="1">
            <TabPanel height="100%" display="flex" flexDirection="column" gap="1em">
              <FormControl border="1px" borderRadius="0.5em" p="1em">
                <FormLabel>Create New Object</FormLabel>
                <Flex gap="0.5em">
                  <Input
                    value={newObjectName}
                    onChange={e => setNewObjectName(e.target.value)}
                    placeholder="Object Name"
                  />
                  <Select width="20em" placeholder="Object Type" />
                  <Button width="10em" onClick={createObject}>
                    Create
                  </Button>
                </Flex>
              </FormControl>
              <Box flexGrow="1" flexShrink="1" flexBasis="0" overflow="auto">
                <Flex gap="1em" wrap="wrap">
                  {sceneCore.scene?.objects.map(obj => (
                    <SceneObjectComp
                      key={obj.objectName}
                      sceneObject={sceneCore.getObject(obj.objectName)}
                    />
                  ))}
                </Flex>
              </Box>
            </TabPanel>
            <TabPanel height="100%">
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
