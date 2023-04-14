import * as React from 'react';
import { Card, CardBody, Heading, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import Vector3Input from '../../components/vector3_input';
import { SceneObjectInterface } from '../../core/hooks/useScene';

type CompProps = {
  sceneObject: SceneObjectInterface;
};

export default function SceneObjectComp({ sceneObject }: CompProps) {
  return (
    <Card>
      <CardBody>
        <Heading size="md" textAlign="center">
          {sceneObject.object?.objectName}
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
        </Flex>
      </CardBody>
    </Card>
  );
}
