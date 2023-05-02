using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using org.matheval;

namespace Assets.Logic.Instructions.Mutators {
    public class EvalInstruction : DataInstruction {
        public EvalInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if (outputName == "output") {
                Expression expression = new(controls["expression"]);
                if(inputs.TryGetValue("a", out var input))
                    expression.Bind("a", (float)input.GetValue());
                if (inputs.TryGetValue("b", out var input1))
                    expression.Bind("b", (float)input1.GetValue());
                var result = expression.Eval<decimal>();
                return (float)result;
            }
            throw new NotImplementedException();
        }
    }
}
