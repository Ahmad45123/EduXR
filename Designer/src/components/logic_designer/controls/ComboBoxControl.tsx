import { Select } from '@chakra-ui/react';
import { BaseCustomControl } from './BaseCustomControl';
import React from 'react';


export class ComboBoxControl extends BaseCustomControl {
  constructor(public label: string, public choices: string[]) {
    super();
  }
}

export function ComboBoxControlImpl(props: { data: ComboBoxControl }) {
  const [value, setValue] = React.useState(props.data.value);
  
  function setComboBoxValue(val: string) {
    props.data.value = val;
      setValue(val);
  }

  return (
    <Select
      placeholder={props.data.label}
      width="100%"
      value={value}
      onPointerDown={e => e.stopPropagation()}
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
