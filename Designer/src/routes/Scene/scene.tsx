import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useRete } from 'rete-react-render-plugin';
import { createEditor } from '../../components/logic_designer';
import { ExportedNodes } from '../../components/logic_designer/node_exporter';
import UnityViewer from '../../components/unity_viewer';
import useScene from '../../core/hooks/useScene';
import { SceneState } from '../../core/states/types';
import { ObjectTypesManagerContext } from '../experiment_root';
import SceneObjectComp from './object_comp';

function Rete({
  sceneState,
  setSceneLogicInFirebase,
}: {
  sceneState: SceneState;
  setSceneLogicInFirebase: (nodes: ExportedNodes) => void;
}) {
  const [ref, editor] = useRete(createEditor);
  useEffect(() => {
    let asyncFunc = async () => {
      await editor?.importSceneState(sceneState.sceneLogic ?? {});
      editor?.onSceneStateChange(nodes => {
        setSceneLogicInFirebase(nodes);
      });
    };
    asyncFunc();
  }, [editor]);
  return <Box ref={ref} style={{ width: '100%', height: '100%' }}></Box>;
}

export default function Scene() {
  const { sceneName, expName } = useParams();

  if (!sceneName || !expName) {
    return <Navigate to="/" />;
  }

  const sceneCore = useScene(expName, sceneName);

  const objectTypesManager = useContext(ObjectTypesManagerContext);
  const [selectedObjectType, setSelectedObjectType] = useState<string>('cube');

  const [newObjectName, setNewObjectName] = useState('');
  const createObject = function () {
    sceneCore.addObject(newObjectName, selectedObjectType);
    setNewObjectName('');
  };

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      display="flex"
      gap="4"
      width="100%"
      height="100%"
      justifyContent="space-between"
      padding="1em"
    >
      <React.Suspense fallback={<Skeleton />}>
        <Box width="50%" height="100%">
          <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            display="flex"
            flexDir="column"
            height="100%"
          >
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
                    <Select
                      value={selectedObjectType}
                      onChange={e => setSelectedObjectType(e.target.value)}
                      width="20em"
                    >
                      <option value="cube">Cube</option>
                      <option value="sphere">Sphere</option>
                      <option value="capsule">Capsule</option>
                      <option value="cylinder">Cylinder</option>
                      {objectTypesManager.objects.map(type => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </Select>
                    <Button width="10em" onClick={createObject}>
                      Create
                    </Button>
                  </Flex>
                </FormControl>
                <Box flexGrow="1" flexShrink="1" flexBasis="0" overflow="auto">
                  <Flex gap="1em" wrap="wrap">
                    {sceneCore.objects.map(obj => (
                      <SceneObjectComp
                        key={obj.objectName}
                        sceneObject={sceneCore.getObject(obj.objectName)}
                      />
                    ))}
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel height="100%">
                {tabIndex === 1 && (
                  <Rete
                    sceneState={sceneCore.scene}
                    setSceneLogicInFirebase={sceneCore.setSceneLogic}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box width="50%" alignSelf="center">
          <UnityViewer
            style={{ width: '100%' }}
            expName={expName}
            sceneName={sceneName}
          />
        </Box>
      </React.Suspense>
    </Box>
  );
}
