import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';

export class OnCollisionNode extends ClassicPreset.Node {
  constructor() {
    super('OnCollision');

    this.addOutput('objName', new ClassicPreset.Output(stringSocket, 'Object Name'));
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec'));
  }
}
