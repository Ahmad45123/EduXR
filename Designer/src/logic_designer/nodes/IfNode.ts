import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { ComboBoxControl } from '../controls/ComboBoxControl';
import { InputBoxControl } from '../controls/InputBoxControl';
import { BaseNode } from '../base_types';

export class IfNode extends BaseNode {
  width = 250;
  orderIndex = {
    left: 0,
    condition: 1,
    right: 2,
  };

  constructor() {
    super('If');

    const left = new ClassicPreset.Input(stringSocket, 'Left Value');
    const right = new ClassicPreset.Input(stringSocket, 'Right Value');
    left.addControl(new InputBoxControl('Left Value'));
    right.addControl(new InputBoxControl('Right Value'));

    this.addInput('left', left);
    this.addControl(
      'condition',
      new ComboBoxControl('Condition', ['Equals', 'Not Equals']),
    );
    this.addInput('right', right);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));
    this.addOutput('then', new ClassicPreset.Output(execSocket, 'Then', false));
    this.addOutput('else', new ClassicPreset.Output(execSocket, 'Else', false));
  }
}
