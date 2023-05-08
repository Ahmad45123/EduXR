using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Mutators {
    class EvalStringInstruction : DataInstruction {
        public EvalStringInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if (outputName == "output") {
                var ans = controls["expression"];
                if (inputs.TryGetValue("a", out var aInput))
                    ans = ans.Replace("{a}", aInput.GetValue().ToString());
                if (inputs.TryGetValue("b", out var bInput))
                    ans = ans.Replace("{b}", bInput.GetValue().ToString());
                return ans;
            }
            throw new NotImplementedException();
        }
    }
}
