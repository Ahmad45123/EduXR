import { Flex, Input, Text } from '@chakra-ui/react';

type Vector3InputProps = {
  value: [number, number, number];
  onChange: (value: [number, number, number]) => void;
};

export default function Vector3Input({ value, onChange }: Vector3InputProps) {
  return (
    <Flex gap="0.5em" width="20em">
      <Flex gap="0.2em">
        <Text alignSelf="center">X: </Text>
        <Input
          type="number"
          value={value[0]}
          onChange={e => onChange([parseFloat(e.target.value), value[1], value[2]])}
        />
      </Flex>
      <Flex gap="0.2em">
        <Text alignSelf="center">Y: </Text>
        <Input
          type="number"
          value={value[1]}
          onChange={e => onChange([value[0], parseFloat(e.target.value), value[2]])}
        />
      </Flex>
      <Flex gap="0.2em">
        <Text alignSelf="center">Z: </Text>
        <Input
          type="number"
          value={value[2]}
          onChange={e => onChange([value[0], value[1], parseFloat(e.target.value)])}
        />
      </Flex>
    </Flex>
  );
}
