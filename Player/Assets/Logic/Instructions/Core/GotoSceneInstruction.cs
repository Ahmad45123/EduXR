using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;

namespace Assets.Logic.Instructions.Core {
    public class GotoSceneInstruction : ExecInstruction {
        public GotoSceneInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms, Dictionary<string, ExecInstruction> nxtInstructions) : base(inputs, parms, nxtInstructions) { }
        public override object GetOutput(string outputName) {
            throw new NotImplementedException();
        }

        protected override void ExecuteImpl() {
            var sceneManager = GetSceneManager();
            var sceneData = sceneManager.sceneLoader.GetSceneWithName(inputs["sceneName"].GetValue().ToString());
            GetSceneManager().SetCurrentScene(sceneData);
        }
    }
}
