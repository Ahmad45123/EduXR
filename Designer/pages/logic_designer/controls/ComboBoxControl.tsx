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
  constructor(public label: string, public choices: string[]) {
    super();
  }
}

export function ComboBoxControlImpl(props: { data: ComboBoxControl }) {
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
        <Select labelId={props.data.id} label={props.data.label} className="w-full">
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
