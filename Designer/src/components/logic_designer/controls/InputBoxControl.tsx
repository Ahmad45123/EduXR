import { ClassicPreset } from 'rete';
import { BaseCustomControl } from './BaseCustomControl';
import { Box, Input, Textarea } from '@chakra-ui/react';
import * as React from 'react';

export class InputBoxControl extends BaseCustomControl {
  public value: string = '';
  constructor(public label: string, public isMultiline: boolean = false) {
    super();
  }
}

export function InputBoxControlImpl(props: { data: InputBoxControl }) {
  function setValue(val: string) {
    props.data.value = val;
  }

  return (
    <Box width="100%">
      {props.data.isMultiline ? (
        <Textarea height="6em" width="100%" onChange={e => setValue(e.target.value)} />
      ) : (
        <Input
          placeholder={props.data.label}
          width="100%"
          onChange={e => setValue(e.target.value)}
        />
      )}
    </Box>
  );
}
