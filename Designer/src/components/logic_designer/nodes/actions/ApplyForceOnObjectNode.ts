import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, numberSocket } from '../../sockets';

export class ApplyForceOnObjectNode extends BaseNode {
  constructor() {
    super('ApplyForceOnObject');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    const x = new ClassicPreset.Input(numberSocket, 'Force In Newtons');
    x.addControl(new InputBoxControl('value'));
    this.addInput('value', x);

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
