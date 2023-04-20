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
        public SceneLoader _sceneLoader;
        public SceneBuilder _sceneBuilder;

        private Core.Scene _currentScene;

        async void SetCurrentScene(SceneData sceneData) {
            // Delete old scene
            if (_currentScene != null)
                _currentScene.Destroy();

            // Load new one.
            _currentScene = await _sceneBuilder.CreateSceneFromData(sceneData);
        }

        async void Start() {
            await _sceneLoader.LoadAllScenes();
            SetCurrentScene(_sceneLoader.GetSceneIndex(0));
        }
    }
}
