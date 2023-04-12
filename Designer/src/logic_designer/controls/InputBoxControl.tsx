import { ClassicPreset } from 'rete';
import { BaseCustomControl } from './BaseCustomControl';
import { Input } from '@chakra-ui/react';
import * as React from 'react';

export class InputBoxControl extends BaseCustomControl {
  public value: string = '';
  constructor(public label: string) {
    super();
  }
}

export function InputBoxControlImpl(props: { data: InputBoxControl }) {
  function setValue(val: string) {
    props.data.value = val;
  }

  return (
    <Input
      placeholder={props.data.label}
      variant="standard"
      width="100%"
      onChange={e => setValue(e.target.value)}
    />
  );
}
