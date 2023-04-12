import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { BaseNode } from '../baseTypes';

export class OnCollisionNode extends BaseNode {
  constructor() {
    super('OnCollision');

    this.addOutput('objName', new ClassicPreset.Output(stringSocket, 'Object Name'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
