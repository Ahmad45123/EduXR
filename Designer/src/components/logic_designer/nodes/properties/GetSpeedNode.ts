import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { numberSocket } from '../../sockets';

export class GetSpeedNode extends BaseNode {
  constructor() {
    super('GetSpeed');

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('speed', new ClassicPreset.Output(numberSocket, 'Speed'));
  }
}
