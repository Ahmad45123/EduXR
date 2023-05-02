using Assets.Logic.Instructions;
using UnityEngine;

namespace Assets.Logic {
    public class LogicManager : MonoBehaviour {
        private ExecInstruction[] _startInstructions;
        private ExecInstruction[] _loopInstructions;
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

        // Update is called once per frame
        void Update() {
            if (!HasStartedExecuting) return;
            foreach (var instruction in _loopInstructions) {
                instruction.Execute();
            }
        }
    }
}
