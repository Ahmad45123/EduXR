﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement;
using Assets.SceneManagement.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    public class SetPositionInstruction : ExecInstruction {
        protected override void ExecuteImpl() {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
            var x = (float)inputs["x"].GetValue();
            var y = (float)inputs["y"].GetValue();
            var z = (float)inputs["z"].GetValue();

            obj.UpdatePosition(new List<float>() {x, y, z});
        }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        public SetPositionInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
    }
}