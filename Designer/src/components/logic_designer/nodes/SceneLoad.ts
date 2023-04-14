import { ClassicPreset } from 'rete';
import { execSocket } from '../sockets';
import { BaseNode } from '../base_types';

export class SceneLoad extends BaseNode {
  constructor() {
    super('SceneLoad');
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
