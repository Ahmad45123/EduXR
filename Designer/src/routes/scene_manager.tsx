import * as React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Button,
  List,
  ListItem,
  IconButton,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useExperiment from '../core/hooks/useExperiment';
import ObjectModelManager from './object_model_manager';

export default function SceneManager() {
  const { createScene, experiment, scenes } = useExperiment('myexp');

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    createScene(sceneName!);
  };

  const navigate = useNavigate();

  return (
    <Flex width={'100%'} height={'100%'} direction={'row'} gap={'1em'}>
      <Card height="100%">
        <CardBody>
          <ObjectModelManager />
        </CardBody>
      </Card>
      <Card flexGrow={1} height="100%">
        <CardBody>
          <Button onClick={addScene}>Create Scene</Button>
          <List width="100%">
            {scenes.map(scene => (
              <ListItem display="flex" gap="1em" mt="1em" key={scene.name}>
                <Text alignSelf="center">{scene.name}</Text>
                <IconButton
                  aria-label="delete"
                  onClick={() => navigate('experiment/myexp/' + scene.name)}
                  icon={<SearchIcon />}
                />
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Flex>
  );
}