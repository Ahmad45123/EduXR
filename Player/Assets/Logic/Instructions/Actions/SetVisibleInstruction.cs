using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement;
using UnityEngine;

namespace Assets.Logic.Instructions.Actions {
    class SetVisibleInstruction : ExecInstruction {
        public SetVisibleInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
            var isVisible = controls["visible"] == "True";
            obj.UpdateVisible(isVisible);
        }
    }
}
