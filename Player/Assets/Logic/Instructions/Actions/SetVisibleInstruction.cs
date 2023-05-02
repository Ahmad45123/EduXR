using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Actions {
    class SetVisibleInstruction : ExecInstruction {
        public SetVisibleInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var gameObject = GameObject.Find(controls["object"]);
            var isVisible = controls["visible"] == "True";
            var renderers = gameObject.GetComponentsInChildren<Renderer>();
            foreach (var renderer in renderers) {
                renderer.enabled = isVisible;
            }
        }
    }
}
