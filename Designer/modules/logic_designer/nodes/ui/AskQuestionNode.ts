import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../../sockets';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { BaseConnection, BaseNode } from './../../baseTypes';

export class AskQuestionNode extends BaseNode {
  constructor() {
    super('AskQuestionNode');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addControl('message', new InputBoxControl('Message'));
    this.addOutput('response', new ClassicPreset.Output(stringSocket, 'User Response'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
