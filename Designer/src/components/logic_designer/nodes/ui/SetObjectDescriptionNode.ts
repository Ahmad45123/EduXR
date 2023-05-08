import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, stringSocket } from '../../sockets';

export class SetObjectDescriptionNode extends BaseNode {
  width = 260;
  constructor() {
    super('SetObjectDescription');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    this.addControl('object', new InputBoxControl('Object Name'));

    const x = new ClassicPreset.Input(stringSocket, 'Description');
    x.addControl(new InputBoxControl('desc', true));
    this.addInput('desc', x);

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
