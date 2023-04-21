using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Firebase.Firestore;

namespace Assets.SceneManagement.Models {

    [FirestoreData]
    public class ObjectData {
        [FirestoreProperty] public string objectName { get; set; }
        [FirestoreProperty] public string objectType { get; set; }
        [FirestoreProperty] public string color { get; set; }
        [FirestoreProperty] public List<float> position { get; set; }
        [FirestoreProperty] public List<float> rotation { get; set; }
        [FirestoreProperty] public List<float> scale { get; set; }
        [FirestoreProperty] public bool hasGravity { get; set; }
        [FirestoreProperty] public bool isGrabbable { get; set; }
    }
}