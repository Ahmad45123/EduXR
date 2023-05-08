import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { numberSocket } from '../sockets';

export class GetTimeSinceLastLoopNode extends BaseNode {
  constructor() {
    super('GetTimeSinceLastLoop');

    this.addOutput('time', new ClassicPreset.Output(numberSocket, 'Time In Seconds'));
  }
}
