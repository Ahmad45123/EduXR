import { ClassicPreset } from 'rete';
import { ComboBoxControl } from './controls/ComboBoxControl';
import { InputBoxControl } from './controls/InputBoxControl';

export class BaseNode extends ClassicPreset.Node<
  { [key in string]?: ClassicPreset.Socket },
  { [key in string]?: ClassicPreset.Socket },
  Record<
    string,
    ComboBoxControl | InputBoxControl | ClassicPreset.InputControl<'text' | 'number'>
  >
> {}
export class BaseConnection extends ClassicPreset.Connection<
  ClassicPreset.Node,
  ClassicPreset.Node
> {}
