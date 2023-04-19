using Assets.SceneManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.SceneManagement {
    class SceneManager : MonoBehaviour {
        Builders.SceneBuilder sceneBuilder;

        private Core.Scene currentScene;

        void SetCurrentScene(SceneData sceneData) {
            // Delete old scene
            if (currentScene != null)
                currentScene.Destroy();

            // Load new one.
            currentScene = sceneBuilder.CreateSceneFromData(sceneData);
        }
    }
}
