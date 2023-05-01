import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { numberSocket } from '../../sockets';

export class GetPositionNode extends BaseNode {
  constructor() {
    super('GetPosition');

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('x', new ClassicPreset.Output(numberSocket, 'x'));
    this.addOutput('y', new ClassicPreset.Output(numberSocket, 'y'));
    this.addOutput('z', new ClassicPreset.Output(numberSocket, 'z'));
  }
}
