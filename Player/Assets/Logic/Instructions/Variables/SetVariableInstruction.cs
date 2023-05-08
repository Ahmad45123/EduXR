using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Variables {
    class SetVariableInstruction : ExecInstruction {
        public SetVariableInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var varName = controls["var"];
            var val = inputs["value"].GetValue();
            GetSceneManager().logicManager.VariablesStore[varName] = val;
        }
    }
}
