import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { numberSocket } from '../../sockets';

export class GetAccelerationNode extends BaseNode {
  constructor() {
    super('GetAcceleration');

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput(
      'acceleration',
      new ClassicPreset.Output(numberSocket, 'Acceleration'),
    );
  }
}
