using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    class GetScaleInstruction : DataInstruction {
        public GetScaleInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms) :
            base(inputs, parms) { }

        public override object GetOutput(string outputName) {
            var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
            var scale = obj.GetScale();

            return outputName switch {
                "x" => scale.x,
                "y" => scale.y,
                "z" => scale.z,
                _ => throw new Exception("Unknown output passed!"),
            };
        }
    }
}