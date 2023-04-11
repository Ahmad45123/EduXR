import { ClassicPreset } from 'rete';
import { execSocket } from '../sockets';

export class SceneLoad extends ClassicPreset.Node {
  constructor() {
    super('SceneLoad');
    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
