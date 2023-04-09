import {
  TextField,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { ClassicPreset } from 'rete';

export class InputBoxControl extends ClassicPreset.Control {
  constructor(public label: string) {
    super();
  }
}

export function InputBoxControlImpl(props: { data: InputBoxControl }) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'dark',
        },
      })}
    >
      <TextField label={props.data.label} variant="standard" className="w-full" />
    </ThemeProvider>
  );
}
