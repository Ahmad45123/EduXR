using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions {
    public abstract class ExecInstruction : DataInstruction {

        public abstract bool IsStartInstruction { get; }
        public abstract bool IsLoopInstruction { get; }

        protected readonly Dictionary<string, ExecInstruction> nextInstructions = null;

        protected ExecInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms) {
            nextInstructions = nxtInstructions;
        }

        public abstract void Execute();
    }
}
