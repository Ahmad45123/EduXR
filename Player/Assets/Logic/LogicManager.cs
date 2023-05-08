using System.Collections.Generic;
using Assets.Logic.Instructions;
using UnityEngine;

namespace Assets.Logic {
    public class LogicManager : MonoBehaviour {
        private ExecInstruction[] _startInstructions;
        private ExecInstruction[] _loopInstructions;

        public Dictionary<string, object> VariablesStore = new();

        public bool HasStartedExecuting { get; private set; }

        public void InitLogicManager(ExecInstruction[] startInstructs, ExecInstruction[] loopInstructs) {
            HasStartedExecuting = false;
            _startInstructions = startInstructs;
            _loopInstructions = loopInstructs;
        }

        public void StartExecuting() {
            foreach (var instruction in _startInstructions) {
                instruction.Execute();
            }

            HasStartedExecuting = true;
        }

        public void StopExecuting() {
            HasStartedExecuting = false;
        }

        // Update is called once per frame
        void FixedUpdate() {
            if (!HasStartedExecuting) return;
            foreach (var instruction in _loopInstructions) {
                instruction.Execute();
            }
        }
    }
}