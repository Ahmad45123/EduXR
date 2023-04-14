import * as React from 'react';
import { Card, CardBody, Heading, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import Vector3Input from '../../components/vector3_input';

export default function SceneObjectComp() {
  const [position, setPosition] = React.useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = React.useState<[number, number, number]>([0, 0, 0]);

  return (
    <Card>
      <CardBody>
        <Heading size="md" textAlign="center">
          Object Name
        </Heading>
        <Flex direction="column" gap="1em">
          <FormControl>
            <FormLabel>Position</FormLabel>
            <Vector3Input value={position} onChange={setPosition} />
          </FormControl>
          <FormControl>
            <FormLabel>Rotation</FormLabel>
            <Vector3Input value={rotation} onChange={setRotation} />
          </FormControl>
        </Flex>
      </CardBody>
    </Card>
  );
}
