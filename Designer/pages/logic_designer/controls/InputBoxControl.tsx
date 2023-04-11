import {
  TextField,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { ClassicPreset } from 'rete';
import { BaseCustomControl } from './BaseCustomControl';

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
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'dark',
        },
      })}
    >
      <TextField
        label={props.data.label}
        variant="standard"
        className="w-full"
        onChange={e => setValue(e.target.value)}
      />
    </ThemeProvider>
  );
}
