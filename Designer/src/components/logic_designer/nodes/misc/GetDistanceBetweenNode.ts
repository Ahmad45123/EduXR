import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { numberSocket } from '../../sockets';

export class GetDistanceBetweenNode extends BaseNode {
  constructor() {
    super('GetDistanceBetween');

    this.addControl('object1', new InputBoxControl('Object One'));
    this.addControl('object2', new InputBoxControl('Object Two'));

    this.addOutput('value', new ClassicPreset.Output(numberSocket, 'Distance In Meters'));
  }
}
