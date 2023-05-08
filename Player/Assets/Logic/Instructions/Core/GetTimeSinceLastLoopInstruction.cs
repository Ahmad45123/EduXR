using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Core {
    class GetTimeSinceLastLoopInstruction : DataInstruction {
        public GetTimeSinceLastLoopInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) : base(inputs, controls) { }
        public override object GetOutput(string outputName) {
            if (outputName == "time") {
                return Time.fixedDeltaTime;
            }
            throw new NotImplementedException();
        }
    }
}
