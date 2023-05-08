import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, stringSocket } from '../../sockets';

export class ShowMessageNode extends BaseNode {
  width = 260;
  constructor() {
    super('ShowMessage');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    const x = new ClassicPreset.Input(stringSocket, 'Message');
    x.addControl(new InputBoxControl('Message', true));
    this.addInput('message', x);

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
