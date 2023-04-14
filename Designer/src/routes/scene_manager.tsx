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
import { AppContext } from '../app';
import { useNavigate } from 'react-router-dom';

export default function SceneManager() {
  const { appdata, setAppdata } = React.useContext(AppContext);

  const addScene = () => {
    const sceneName = prompt('Enter scene name');
    setAppdata(draft => {
      draft.scenes.push({ name: sceneName!, objects: [] });
    });
  };

  const navigate = useNavigate();

  return (
    <Card width="100%" height="100%">
      <CardBody>
        <Button onClick={addScene}>Create Scene</Button>
        <List width="100%">
          {appdata.scenes.map(scene => (
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
