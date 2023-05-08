using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Properties {
    class GetSpeedInstruction : DataInstruction {
        public GetSpeedInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if (outputName == "speed") {
                var obj = GetSceneManager().currentScene.GetObject(controls["object"]);
                return obj.GetSpeed();
            }
            throw new NotImplementedException();
        }
    }
}
