import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { InputBoxControl } from '../controls/InputBoxControl';

export class GotoSceneNode extends ClassicPreset.Node {
  constructor() {
    super('GotoScene');

    const sceneName = new ClassicPreset.Input(stringSocket, 'Scene Name');
    sceneName.addControl(new InputBoxControl('Scene Name'));
    this.addInput('sceneName', sceneName);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec'));
  }
}
