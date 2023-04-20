import * as React from 'react';
import {
  Card,
  CardBody,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import Vector3Input from '../../components/vector3_input';
import { SceneObjectInterface } from '../../core/hooks/useScene';
import { ObjectTypesManagerContext } from '../experiment_root';
import { CompactPicker } from 'react-color';
import { IsPrimitiveObject } from '../../core/misc';

type CompProps = {
  sceneObject: SceneObjectInterface;
};

export default function SceneObjectComp({ sceneObject }: CompProps) {
  const [hasColor, setHasColor] = React.useState(false);

  React.useEffect(() => {
    setHasColor(IsPrimitiveObject(sceneObject.object!));
  }, [sceneObject]);

  return (
    <Card>
      <CardBody>
        <Heading size="md" textAlign="center">
          {sceneObject.object?.objectName} ({sceneObject.object?.objectType})
        </Heading>
        <Flex direction="column" gap="1em">
          <FormControl>
            <FormLabel>Position</FormLabel>
            <Vector3Input
              value={sceneObject.object?.position ?? [0, 0, 0]}
              onChange={sceneObject.setPosition}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rotation</FormLabel>
            <Vector3Input
              value={sceneObject.object?.rotation ?? [0, 0, 0]}
              onChange={sceneObject.setRotation}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Scale</FormLabel>
            <Vector3Input
              value={sceneObject.object?.scale ?? [0, 0, 0]}
              onChange={sceneObject.setScale}
            />
          </FormControl>
          {hasColor && (
            <FormControl>
              <FormLabel>Color</FormLabel>
              <CompactPicker
                color={sceneObject.object?.color}
                onChange={e => sceneObject.setColor(e.hex)}
              />
            </FormControl>
          )}
          <FormControl display="flex" gap="0.1em" flexDir="column">
            <FormLabel>Others</FormLabel>
            <Checkbox
              isChecked={sceneObject.object?.hasGravity}
              onChange={e => sceneObject.setHasGravity(e.target.checked)}
            >
              Has Gravity
            </Checkbox>
            <Checkbox
              isChecked={sceneObject.object?.isGrabbable}
              onChange={e => sceneObject.setGrabbable(e.target.checked)}
            >
              Is Grabable
            </Checkbox>
          </FormControl>
          <Button color="red" onClick={sceneObject.deleteSelf}>
            Delete
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
