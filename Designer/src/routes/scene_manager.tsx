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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useExperiment from '../eduxr_core/Experiment';

export default function SceneManager() {
  const { createScene, experiment } = useExperiment();

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    createScene(sceneName!);
  };

  const navigate = useNavigate();

  return (
    <Card width="100%" height="100%">
      <CardBody>
        <Button onClick={addScene}>Create Scene</Button>
        <List width="100%">
          {experiment.scenes.map(scene => (
            <ListItem display="flex" gap="1em" mt="1em" key={scene.name}>
              <Text alignSelf="center">{scene.name}</Text>
              <IconButton
                aria-label="delete"
                onClick={() => navigate('scene/' + scene.name)}
                icon={<SearchIcon />}
              />
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
}
