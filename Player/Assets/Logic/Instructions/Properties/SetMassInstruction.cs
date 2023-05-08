using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement;

namespace Assets.Logic.Instructions.Properties {
    class SetMassInstruction : ExecInstruction {
        public SetMassInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var obj = SceneManager.currentScene.GetObject(controls["object"]);
            var val = (float)inputs["value"].GetValue();
            obj.UpdateMass(val);
        }
    }
}
