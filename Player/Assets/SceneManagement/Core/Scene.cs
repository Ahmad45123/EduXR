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
        public string Description;

        public Object GetObject(string name) {
            return sceneObjects.Find((x) => x.Name == name);
        }

        public void Destroy() {
            foreach (var obj in sceneObjects) {
                obj.Destroy();
            }
        }
    }
}
