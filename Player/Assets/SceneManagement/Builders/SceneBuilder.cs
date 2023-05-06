using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic;
using UnityEngine;
using Object = Assets.SceneManagement.Core.Object;

namespace Assets.SceneManagement.Builders {
    class SceneBuilder : MonoBehaviour {
        public ObjectBuilder objectBuilder;

        public async Task<Core.Scene> CreateSceneFromData(Models.SceneData sceneData) {
            Core.Scene scene = new() {
                sceneObjects = new List<Object>(),
                Description = sceneData.description
            };

            foreach(var obj in sceneData.objects) {
                scene.sceneObjects.Add(await objectBuilder.CreateObjectFromData(obj));
            }

            var logicBuilder = new LogicBuilder(sceneData.sceneLogic);
            scene.Instructions = logicBuilder.GetInstructions();

            return scene;
        }
    }
}
