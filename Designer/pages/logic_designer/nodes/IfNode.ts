import { ClassicPreset } from 'rete';
import { stringSocket, execSocket } from '../sockets';
import { ComboBoxControl } from '../controls/ComboBoxControl';
import { InputBoxControl } from '../controls/InputBoxControl';

export class IfNode extends ClassicPreset.Node {
  width = 250;
  orderIndex = {
    left: 0,
    condition: 1,
    right: 2,
  };

  constructor() {
    super('If');

    const left = new ClassicPreset.Input(stringSocket, 'Left');
    const right = new ClassicPreset.Input(stringSocket, 'Right');
    left.addControl(new InputBoxControl('Left Value'));
    right.addControl(new InputBoxControl('Right Value'));

    this.addInput('left', left);
    this.addControl(
      'condition',
      new ComboBoxControl('Condition', ['Equals', 'Not Equals']),
    );
    this.addInput('right', right);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec'));
    this.addOutput('then', new ClassicPreset.Output(execSocket, 'Then'));
    this.addOutput('else', new ClassicPreset.Output(execSocket, 'Else'));
  }
}
