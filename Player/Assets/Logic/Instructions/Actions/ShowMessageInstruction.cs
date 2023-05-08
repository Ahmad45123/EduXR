using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Actions {
    class ShowMessageInstruction : ExecInstruction {
        public ShowMessageInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var message = inputs["message"].GetValue();
            GetSceneManager().ShowDescription(message.ToString());
        }
    }
}
