import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  Flex,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import useExperiment from '../core/hooks/useExperiment';
import ObjectModelManager from './object_model_manager';

export default function SceneManager() {
  const { expName } = useParams();

  const { createScene, scenes } = useExperiment(expName!);

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
            {scenes
              .sort((a, b) => a.index - b.index)
              .map(scene => (
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
    </Flex>
  );
}
