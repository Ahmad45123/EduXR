using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    class GetRotationInstruction : DataInstruction {
        public GetRotationInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms) :
            base(inputs, parms) { }

        public override object GetOutput(string outputName) {
            var obj = SceneManager.currentScene.GetObject(controls["object"]);
            var rotation = obj.GetRotation();

            return outputName switch {
                "x" => rotation.x,
                "y" => rotation.y,
                "z" => rotation.z,
                _ => throw new Exception("Unknown output passed!"),
            };
        }
    }
}
