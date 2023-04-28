import { ClassicPreset } from 'rete';
import { BaseCustomControl } from './BaseCustomControl';
import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import * as React from 'react';

export class InputBoxControl extends BaseCustomControl {
  public value: string = '';
  constructor(public label: string, public isMultiline: boolean = false) {
    super();
  }
}

export function InputBoxControlImpl(props: { data: InputBoxControl }) {
  const [value, setValue] = React.useState(props.data.value);

  React.useEffect(() => {
    setValue(props.data.value);
  }, [props.data.value]);

  return (
    <Box width="100%">
      <FormControl>
        <FormLabel color={'white'}>{props.data.label}</FormLabel>
        {props.data.isMultiline ? (
          <Textarea
            height="6em"
            width="100%"
            value={value}
            onPointerDown={e => e.stopPropagation()}
            onChange={e => {
              setValue(e.target.value);
              props.data.value = e.target.value;
            }}
          />
        ) : (
          <Input
            value={value}
            width="100%"
            onPointerDown={e => e.stopPropagation()}
            onChange={e => {
              setValue(e.target.value);
              props.data.value = e.target.value;
            }}
          />
        )}
      </FormControl>
    </Box>
  );
}
