using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Actions {
    class ApplyForceOnObjectInstruction : ExecInstruction {
        public ApplyForceOnObjectInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
            var x = (float)inputs["x"].GetValue();
            var y = (float)inputs["y"].GetValue();
            var z = (float)inputs["z"].GetValue();
            obj.ApplyForce(new Vector3(x, y, z));
        }
    }
}
