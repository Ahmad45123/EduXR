using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic;
using Assets.Logic.Instructions;

namespace Assets.SceneManagement.Core {
    public class Scene {
        public List<Object> sceneObjects;
        public DataInstruction[] Instructions;

        public void StartExecution(LogicManager logicManager) {
            List<ExecInstruction> startInstructions = new();
            List<ExecInstruction> loopInstructions = new();

            foreach (var instruction in Instructions) {
                if (instruction is not ExecInstruction execInstruct) continue;
                if (execInstruct.IsStartInstruction) startInstructions.Add(execInstruct);
                if (execInstruct.IsLoopInstruction) loopInstructions.Add(execInstruct);
            }

            logicManager.InitLogicManager(startInstructions.ToArray(), loopInstructions.ToArray());
            logicManager.StartExecuting();
        }

        public void Destroy() {
            //TODO: Add destroying logic of this scene.
        }
    }
}
