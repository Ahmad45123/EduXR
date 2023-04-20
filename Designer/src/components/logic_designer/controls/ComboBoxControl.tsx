import * as React from 'react';
import { ClassicPreset } from 'rete';
import { BaseCustomControl } from './BaseCustomControl';
import { Select } from '@chakra-ui/react';

export class ComboBoxControl extends BaseCustomControl {
  constructor(public label: string, public choices: string[]) {
    super();
  }
}

export function ComboBoxControlImpl(props: { data: ComboBoxControl }) {
  function setComboBoxValue(val: string) {
    props.data.value = val;
  }

  return (
    <Select
      placeholder={props.data.label}
      width="100%"
      onChange={e => setComboBoxValue(e.target.value as string)}
    >
      {props.data.choices.map(x => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </Select>
  );
}