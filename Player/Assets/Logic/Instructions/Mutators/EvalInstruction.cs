using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Mutators {
    public class EvalInstruction : DataInstruction {
        public EvalInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }
    }
}
