using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Misc {
    class GetDistanceBetweenInstruction : DataInstruction {
        public GetDistanceBetweenInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if (outputName == "value") {
                var obj1 = GetSceneManager().currentScene.GetObject(controls["object1"]);
                var obj2 = GetSceneManager().currentScene.GetObject(controls["object2"]);
                return Vector3.Distance(obj1.GetRealPosition(), obj2.GetRealPosition());
            }
            throw new NotImplementedException();
        }
    }
}
