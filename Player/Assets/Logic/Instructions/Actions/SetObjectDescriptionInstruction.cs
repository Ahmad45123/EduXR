using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Actions {
    class SetObjectDescriptionInstruction : ExecInstruction {
        public SetObjectDescriptionInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
            var desc = inputs["desc"].GetValue().ToString();
            obj.SetDescription(desc);
        }
    }
}
