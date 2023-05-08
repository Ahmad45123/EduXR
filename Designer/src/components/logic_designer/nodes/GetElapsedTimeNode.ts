import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { numberSocket } from '../sockets';

export class GetElapsedTimeNode extends BaseNode {
  constructor() {
    super('GetElapsedTime');

    this.addOutput('time', new ClassicPreset.Output(numberSocket, 'Elasped Time'));
  }
}
