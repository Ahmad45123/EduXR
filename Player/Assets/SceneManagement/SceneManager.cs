using Assets.SceneManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic;
using Assets.Logic.Instructions;
using Assets.SceneManagement.Builders;
using UnityEngine;
using Firebase.Extensions;
using Oculus.Voice.Demo.UIShapesDemo;
using TMPro;

namespace Assets.SceneManagement {
    class SceneManager : MonoBehaviour {
        public SceneLoader sceneLoader;
        public SceneBuilder sceneBuilder;
        public LogicManager logicManager;

        public GameObject sceneDescriptionGameObject;

        private Core.Scene _currentScene;

        async void SetCurrentScene(SceneData sceneData) {
            // Delete old scene
            if (_currentScene != null)
                _currentScene.Destroy();

            // Load new one.
            _currentScene = await sceneBuilder.CreateSceneFromData(sceneData);

            // Show Description First
            ShowDescription(_currentScene.Description);

            // Start Scene
            StartSceneExecution();
        }

        void StartSceneExecution() {
            List<ExecInstruction> startInstructions = new();
            List<ExecInstruction> loopInstructions = new();

            foreach (var instruction in _currentScene.Instructions) {
                if (instruction is not ExecInstruction execInstruct) continue;
                if (execInstruct.IsStartInstruction) startInstructions.Add(execInstruct);
                if (execInstruct.IsLoopInstruction) loopInstructions.Add(execInstruct);
            }

            logicManager.InitLogicManager(startInstructions.ToArray(), loopInstructions.ToArray());
            logicManager.StartExecuting();
        }

        public void ShowDescription(string message) {
            sceneDescriptionGameObject.SetActive(true);
            sceneDescriptionGameObject
                .GetComponentsInChildren<TextMeshProUGUI>().First(x => x.name == "SceneDescriptionText").text = message;
        }

        public void HideDescription() {
            sceneDescriptionGameObject.SetActive(false);
        }

        async void Start() {
            await sceneLoader.LoadAllScenes();
            SetCurrentScene(sceneLoader.GetSceneIndex(0));
        }
    }
}
