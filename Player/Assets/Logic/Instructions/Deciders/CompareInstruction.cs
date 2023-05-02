using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Deciders {
    public class CompareInstruction : ExecInstruction {
        public CompareInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() { }

        public override void Execute() {
            if (inputs["left"].GetValue() is not IComparable leftValue ||
                inputs["right"].GetValue() is not IComparable rightValue)
                throw new Exception("Input values are not comparable!");

            var compare = leftValue.CompareTo(rightValue);
            switch (compare) {
                case 0:
                    nextInstructions.GetValueOrDefault("equal")?.Execute();
                    break;
                case < 0:
                    nextInstructions.GetValueOrDefault("lessthan")?.Execute();
                    break;
                case > 0:
                    nextInstructions.GetValueOrDefault("biggerthan")?.Execute();
                    break;
            }
        }
    }
}