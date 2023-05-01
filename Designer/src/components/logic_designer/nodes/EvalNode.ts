import { ClassicPreset } from 'rete';
import { BaseNode } from '../base_types';
import { InputBoxControl } from '../controls/InputBoxControl';
import { numberSocket } from '../sockets';

export class EvalNode extends BaseNode {
  orderIndex = {
    a: 0,
    b: 1,
    expression: 2,
  };

  constructor() {
    super('Eval');

    this.addControl('expression', new InputBoxControl('Expression'));

    this.addInput('a', new ClassicPreset.Input(numberSocket, 'a'));
    this.addInput('b', new ClassicPreset.Input(numberSocket, 'b'));

    this.addOutput('output', new ClassicPreset.Output(numberSocket, 'Output'));
  }
}
