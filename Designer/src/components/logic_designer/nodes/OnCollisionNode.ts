import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { BaseNode } from '../base_types';
import { InputBoxControl } from '../controls/InputBoxControl';

export class OnCollisionNode extends BaseNode {
  constructor() {
    super('OnCollision');

    this.addControl('firstObject', new InputBoxControl('First Object'));
    this.addControl('secondObject', new InputBoxControl('Second Object'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
