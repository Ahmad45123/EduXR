﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    class SetScaleInstruction : ExecInstruction {
        protected override void ExecuteImpl() {
            var gameObject = GameObject.Find(controls["object"]);
            var x = (float)inputs["x"].GetValue();
            var y = (float)inputs["y"].GetValue();
            var z = (float)inputs["z"].GetValue();

            gameObject.transform.localScale = new Vector3(x, y, z);
        }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        public SetScaleInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
    }
}
