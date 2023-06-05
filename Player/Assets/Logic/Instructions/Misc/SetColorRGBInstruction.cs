using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Misc {
    class SetColorRGBInstruction : ExecInstruction {
        public SetColorRGBInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);

            var r = (float)inputs["r"].GetValue();
            var g = (float)inputs["g"].GetValue();
            var b = (float)inputs["b"].GetValue();

            obj.UpdateColor(r, g, b);
        }
    }
}
