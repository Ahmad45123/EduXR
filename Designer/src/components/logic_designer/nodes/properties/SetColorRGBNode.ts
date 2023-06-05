import { ClassicPreset } from 'rete';
import { BaseNode } from '../../base_types';
import { InputBoxControl } from '../../controls/InputBoxControl';
import { execSocket, numberSocket } from '../../sockets';

export class SetColorRGBNode extends BaseNode {
  constructor() {
    super('SetColorRGB');

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec', true));

    const r = new ClassicPreset.Input(numberSocket, 'r');
    r.addControl(new InputBoxControl('Red'));
    this.addInput('r', r);

    const g = new ClassicPreset.Input(numberSocket, 'g');
    g.addControl(new InputBoxControl('Green'));
    this.addInput('g', g);

    const b = new ClassicPreset.Input(numberSocket, 'b');
    b.addControl(new InputBoxControl('Blue'));
    this.addInput('b', b);

    this.addControl('object', new InputBoxControl('Object Name'));

    this.addOutput('exec', new ClassicPreset.Output(execSocket, 'Exec', false));
  }
}
