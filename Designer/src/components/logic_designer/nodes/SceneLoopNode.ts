import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { execSocket } from '../sockets';

export class SceneLoopNode extends BaseNode {
  constructor() {
    super('SceneLoop');
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
