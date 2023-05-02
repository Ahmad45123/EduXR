using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions {
    public abstract class DataInstruction {

        protected readonly Dictionary<string, string> controls;
        protected readonly Dictionary<string, InputParam> inputs;

        protected DataInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> controls) {
            this.inputs = inputs;
            this.controls = controls;
        }

        public abstract object GetOutput(string outputName);
    }
}
