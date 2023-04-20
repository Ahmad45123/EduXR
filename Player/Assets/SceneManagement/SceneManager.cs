using Assets.SceneManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Builders;
using UnityEngine;
using Firebase.Extensions;

namespace Assets.SceneManagement {
    class SceneManager : MonoBehaviour {
        private SceneLoader _sceneLoader;
        private SceneBuilder _sceneBuilder;

        private Core.Scene _currentScene;

        void SetCurrentScene(SceneData sceneData) {
            // Delete old scene
            if (_currentScene != null)
                _currentScene.Destroy();

            // Load new one.
            _currentScene = _sceneBuilder.CreateSceneFromData(sceneData);
        }

        void Start() {
            _sceneLoader.LoadAllScenes().ContinueWithOnMainThread(task => {
                SetCurrentScene(_sceneLoader.GetSceneIndex(0));
            });
        }
    }
}
