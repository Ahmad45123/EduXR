using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Instructions;

namespace Assets.Logic.Misc {
    // An instruction that simply returns the supplied `value` control.
    public class ConstantValueInstruction : DataInstruction {
        public ConstantValueInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if(float.TryParse(controls["value"], out var res))
                return res;
            return controls["value"];
        }
    }
}
