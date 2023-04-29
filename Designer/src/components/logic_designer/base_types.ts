import { ClassicPreset, GetSchemes } from 'rete';
import { ComboBoxControl } from './controls/ComboBoxControl';
import { InputBoxControl } from './controls/InputBoxControl';
import { ReactArea2D } from 'rete-react-render-plugin';

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

export type Schemes = GetSchemes<BaseNode, BaseConnection>;
export type AreaExtra = ReactArea2D<Schemes>;

export type NodeType =
  | 'SceneLoad'
  | 'GotoScene'
  | 'OnCollision'
  | 'AskQuestion'
  | 'ShowMessage';
