import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../../sockets';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { BaseNode } from '../../base_types';

export class ShowMessageNode extends BaseNode {
  width = 260;
  constructor() {
    super('ShowMessage');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addControl('message', new InputBoxControl('Message', true));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
