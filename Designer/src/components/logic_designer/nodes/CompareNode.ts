import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';

import { InputBoxControl } from '../controls/InputBoxControl';
import { execSocket, numberOrStringSocket } from '../sockets';

export class CompareNode extends BaseNode {
  width = 250;
  orderIndex = {
    left: 0,
    condition: 1,
    right: 2,
  };

  constructor() {
    super('Compare');

    const left = new ClassicPreset.Input(numberOrStringSocket, 'Left Value');
    const right = new ClassicPreset.Input(numberOrStringSocket, 'Right Value');
    left.addControl(new InputBoxControl('Left Value'));
    right.addControl(new InputBoxControl('Right Value'));

    this.addInput('left', left);
    this.addInput('right', right);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addOutput('equal', new ClassicPreset.Output(execSocket, 'L = R', false));
    this.addOutput('biggerthan', new ClassicPreset.Output(execSocket, 'L > R', false));
    this.addOutput('lessthan', new ClassicPreset.Output(execSocket, 'L < R', false));
  }
}
