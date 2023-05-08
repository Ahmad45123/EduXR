import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { numberOrStringSocket } from '../../sockets';

export class GetVariableNode extends BaseNode {
  constructor() {
    super('GetVariable');

    this.addControl('var', new InputBoxControl('Variable Name'));

    this.addOutput('value', new ClassicPreset.Output(numberOrStringSocket, 'Value'));
  }
}
