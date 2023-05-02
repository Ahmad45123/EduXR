﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Core {
    public class SceneLoopInstruction : ExecInstruction {
        public SceneLoopInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms,
            Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }

        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        public override bool IsLoopInstruction => true;

        protected override void ExecuteImpl() {
            // Next instruction is already called in base class.
        }
    }
}