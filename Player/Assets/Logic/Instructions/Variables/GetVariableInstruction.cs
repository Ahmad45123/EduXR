using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Variables {
    class GetVariableInstruction : DataInstruction {
        public GetVariableInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) :
            base(inputs, controls) { }

        public override object GetOutput(string outputName) {
            var logicManager = GetSceneManager().logicManager;
            if (outputName == "value") {
                return !logicManager.VariablesStore.ContainsKey(controls["var"])
                    ? null
                    : GetSceneManager().logicManager.VariablesStore[controls["var"]];
            }

            throw new NotImplementedException();
        }
    }
}
