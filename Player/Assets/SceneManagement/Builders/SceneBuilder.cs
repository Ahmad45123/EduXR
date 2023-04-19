using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.SceneManagement.Builders {
    class SceneBuilder : MonoBehaviour {
        public ObjectBuilder objectBuilder;

        public Core.Scene CreateSceneFromData(Models.SceneData sceneData) {
            Core.Scene scene = new Core.Scene();
            foreach(var obj in sceneData.objects) {
                scene.sceneObjects.Add(objectBuilder.CreateObjectFromData(obj));
            }
            return scene;
        }
    }
}
