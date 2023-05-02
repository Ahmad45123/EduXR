using Assets.SceneManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic;
using Assets.SceneManagement.Builders;
using UnityEngine;
using Firebase.Extensions;

namespace Assets.SceneManagement {
    class SceneManager : MonoBehaviour {
        public SceneLoader sceneLoader;
        public SceneBuilder sceneBuilder;
        public LogicManager logicManager;

        private Core.Scene _currentScene;

        async void SetCurrentScene(SceneData sceneData) {
            // Delete old scene
            if (_currentScene != null)
                _currentScene.Destroy();

            // Load new one.
            _currentScene = await sceneBuilder.CreateSceneFromData(sceneData);

            // Start Scene
            _currentScene.StartExecution(logicManager);
        }

        async void Start() {
            await sceneLoader.LoadAllScenes();
            SetCurrentScene(sceneLoader.GetSceneIndex(0));
        }
    }
}
