import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket } from '../../sockets';

export class ShowMessageNode extends BaseNode {
  width = 260;
  constructor() {
    super('ShowMessage');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addControl('message', new InputBoxControl('Message', true));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
