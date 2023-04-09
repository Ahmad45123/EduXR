import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { ClassicPreset } from 'rete';

export class ComboBoxControl extends ClassicPreset.Control {
  public value: string = '';
  constructor(public label: string, public choices: string[]) {
    super();
  }
}

export function ComboBoxControlImpl(props: { data: ComboBoxControl }) {
  function setComboBoxValue(val: string) {
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
      <FormControl fullWidth variant="standard">
        <InputLabel id={props.data.id}>{props.data.label}</InputLabel>
        <Select
          labelId={props.data.id}
          label={props.data.label}
          className="w-full"
          onChange={e => setComboBoxValue(e.target.value as string)}
        >
          {props.data.choices.map(x => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
