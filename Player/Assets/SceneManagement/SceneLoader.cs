using System.Collections.Generic;
using System.Threading.Tasks;
using Assets.SceneManagement.Models;
using Firebase.Extensions;
using Firebase.Firestore;
using UnityEngine;

namespace Assets.SceneManagement {
    public class SceneLoader : MonoBehaviour {
        private FirebaseFirestore _db;

        // public string username;
        public string experimentName;

        private List<SceneData> _scenes;

        public async Task LoadAllScenes() {
            _scenes = new List<SceneData>();
            var scenesRef = _db.Collection($"experiments/{experimentName}/_scenes");
            var snapshot = await scenesRef.GetSnapshotAsync();
            foreach (var documentSnapshot in snapshot.Documents) {
                var scene = documentSnapshot.ConvertTo<SceneData>();
                scene = await LoadScene(scene);
                _scenes.Add(scene);
            }
        }

        public async Task<SceneData> LoadScene(SceneData scene) {
            var objectsRef = _db.Collection($"experiments/{experimentName}/_scenes/{scene.name}");
            var snapshot = await objectsRef.GetSnapshotAsync();
            foreach (var documentSnapshot in snapshot.Documents) {
                var obj = documentSnapshot.ConvertTo<ObjectData>();
                scene.objects.Add(obj);
            }

            return scene;
        }

        public SceneData GetSceneIndex(int idx) {
            return _scenes[idx];
        }

        void Start() {
            _db = FirebaseFirestore.DefaultInstance;
        }
    }
}