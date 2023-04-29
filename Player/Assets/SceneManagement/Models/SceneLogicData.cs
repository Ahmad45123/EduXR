using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Firebase.Firestore;

namespace Assets.SceneManagement.Models {
    [FirestoreData]
    public class SceneLogicData {
        [FirestoreProperty] public string name { get; set; }
        [FirestoreProperty] public List<float> position { get; set; }
        [FirestoreProperty] public Dictionary<string, string> controls { get; set; }
        [FirestoreProperty] public Dictionary<string, string> execOutputs { get; set; }
        [FirestoreProperty] public Dictionary<string, string> inputValues { get; set; }
        [FirestoreProperty] public Dictionary<string, InputFromData> inputsFrom { get; set; }
    }

    [FirestoreData]
    public class InputFromData {
        [FirestoreProperty] public string nodeId { get; set; }
        [FirestoreProperty] public string outputName { get; set; }
    }
}