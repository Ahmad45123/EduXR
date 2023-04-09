import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';

export class GotoSceneNode extends ClassicPreset.Node {
  constructor() {
    super('GotoScene');

    const sceneName = new ClassicPreset.Input(stringSocket, 'sceneName');
    sceneName.addControl(new ClassicPreset.InputControl('text'));
    this.addInput('sceneName', sceneName);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec'));
  }
}
