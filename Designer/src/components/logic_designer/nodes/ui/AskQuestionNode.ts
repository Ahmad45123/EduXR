import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, stringSocket } from '../../sockets';

export class AskQuestionNode extends BaseNode {
  width = 260;
  constructor() {
    super('AskQuestion');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addControl('message', new InputBoxControl('Message', true));
    this.addOutput('response', new ClassicPreset.Output(stringSocket, 'User Response'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
