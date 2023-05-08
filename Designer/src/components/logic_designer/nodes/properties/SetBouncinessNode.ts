import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, numberSocket } from '../../sockets';

export class SetBouncinessNode extends BaseNode {
  constructor() {
    super('SetBounciness');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    const x = new ClassicPreset.Input(numberSocket, 'value');
    x.addControl(new InputBoxControl('value'));
    this.addInput('value', x);

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
