import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { InputBoxControl } from '../controls/InputBoxControl';
import { BaseNode } from '../base_types';

export class GotoSceneNode extends BaseNode {
  constructor() {
    super('GotoScene');

    const sceneName = new ClassicPreset.Input(stringSocket, 'Scene Name');
    sceneName.addControl(new InputBoxControl('Scene Name'));
    this.addInput('sceneName', sceneName);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
  }
}
