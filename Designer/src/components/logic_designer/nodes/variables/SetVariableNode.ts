import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, numberOrStringSocket } from '../../sockets';

export class SetVariableNode extends BaseNode {
  constructor() {
    super('SetVariable');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    this.addControl('var', new InputBoxControl('Variable Name'));
    this.addInput('value', new ClassicPreset.Input(numberOrStringSocket, 'Value'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
