using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using org.mariuszgromada.math.mxparser;

namespace Assets.Logic.Instructions.Mutators {
    public class EvalInstruction : DataInstruction {

        private readonly Expression _expression;

        public EvalInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(
            inputs, controls) {
            _expression = new Expression(controls["expression"]);
            _expression.addArguments(new Argument("a", 0));
            _expression.addArguments(new Argument("b", 0));
        }
        public override object GetOutput(string outputName) {
            if (outputName == "output") {
                
                if(inputs.TryGetValue("a", out var aInput))
                    _expression.setArgumentValue("a", (float)aInput.GetValue());
                if (inputs.TryGetValue("b", out var bInput))
                    _expression.setArgumentValue("b", (float)bInput.GetValue());
                var result = _expression.calculate();
                return (float)result;
            }
            throw new NotImplementedException();
        }
    }
}
