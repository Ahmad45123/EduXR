import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { InputBoxControl } from '../controls/InputBoxControl';
import { numberOrStringSocket, numberSocket, stringSocket } from '../sockets';

export class EvalStringNode extends BaseNode {
  width = 300;
  orderIndex = {
    a: 0,
    b: 1,
    expression: 2,
  };

  constructor() {
    super('EvalString');

    this.addControl(
      'expression',
      new InputBoxControl(
        'Expression',
        true,
        'Use {a} and {b} to replace with values from the input.',
      ),
    );

    this.addInput('a', new ClassicPreset.Input(numberOrStringSocket, 'a'));
    this.addInput('b', new ClassicPreset.Input(numberOrStringSocket, 'b'));

    this.addOutput('output', new ClassicPreset.Output(stringSocket, 'Output'));
  }
}
