using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Instructions;

namespace Assets.Logic.Misc {
    public class InputParam {
        private readonly DataInstruction _instruction;
        private readonly string _paramName;

        public InputParam(DataInstruction instruction, string paramName) {
            _instruction = instruction;
            _paramName = paramName;
        }

        public object GetValue() {
            return _instruction.GetOutput(_paramName);
        }
    }
}
