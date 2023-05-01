import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { ComboBoxControl } from '../../controls/ComboBoxControl';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket } from '../../sockets';

export class SetVisibleNode extends BaseNode {
  constructor() {
    super('SetVisible');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    this.addControl('object', new InputBoxControl('Object Name'));
    this.addControl('visible', new ComboBoxControl('Visible', ['True', 'False']));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
