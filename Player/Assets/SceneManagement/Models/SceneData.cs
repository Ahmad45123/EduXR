using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Firebase.Firestore;

namespace Assets.SceneManagement.Models {
    [Serializable]
    [FirestoreData]
    public class SceneData {
        [FirestoreProperty] public string name { get; set; }
        [FirestoreProperty] public Dictionary<string, SceneLogicData> sceneLogic { get; set; }
        public List<ObjectData> objects;
    }
}