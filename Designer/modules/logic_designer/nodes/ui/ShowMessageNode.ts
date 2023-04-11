import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../../sockets';
import { InputBoxControl } from '../../controls/InputBoxControl';

export class ShowMessageNode extends ClassicPreset.Node {
  constructor() {
    super('ShowMessageNode');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addControl('message', new InputBoxControl('Message'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
