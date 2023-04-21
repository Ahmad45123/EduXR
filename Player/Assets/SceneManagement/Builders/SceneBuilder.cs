using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using Object = Assets.SceneManagement.Core.Object;

namespace Assets.SceneManagement.Builders {
    class SceneBuilder : MonoBehaviour {
        public ObjectBuilder objectBuilder;

        public async Task<Core.Scene> CreateSceneFromData(Models.SceneData sceneData) {
            Core.Scene scene = new Core.Scene() {
                sceneObjects = new List<Object>()
            };
            foreach(var obj in sceneData.objects) {
                scene.sceneObjects.Add(await objectBuilder.CreateObjectFromData(obj));
            }
            return scene;
        }
    }
}
