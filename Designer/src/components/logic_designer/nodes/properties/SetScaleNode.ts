import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, numberSocket } from '../../sockets';

export class SetScaleNode extends BaseNode {
  constructor() {
    super('SetScale');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    const x = new ClassicPreset.Input(numberSocket, 'x');
    x.addControl(new InputBoxControl('x'));
    this.addInput('x', x);

    const y = new ClassicPreset.Input(numberSocket, 'y');
    y.addControl(new InputBoxControl('y'));
    this.addInput('y', y);

    const z = new ClassicPreset.Input(numberSocket, 'z');
    z.addControl(new InputBoxControl('z'));
    this.addInput('z', z);

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
