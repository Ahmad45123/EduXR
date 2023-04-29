import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { execSocket } from '../sockets';

export class SceneLoadNode extends BaseNode {
  constructor() {
    super('SceneLoad');
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
