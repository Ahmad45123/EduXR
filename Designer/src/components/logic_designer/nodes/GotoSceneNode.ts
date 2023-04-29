import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { InputBoxControl } from '../controls/InputBoxControl';
import { execSocket, stringSocket } from '../sockets';

export class GotoSceneNode extends BaseNode {
  constructor() {
    super('GotoScene');

    const sceneName = new ClassicPreset.Input(stringSocket, 'Scene Name');
    sceneName.addControl(new InputBoxControl('Scene Name'));
    this.addInput('sceneName', sceneName);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
  }
}
