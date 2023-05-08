import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, stringSocket } from '../../sockets';

export class SetColorNode extends BaseNode {
  constructor() {
    super('SetColor');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    this.addControl('object', new InputBoxControl('Object Name'));
    this.addControl('color', new InputBoxControl('Color In Hex'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
