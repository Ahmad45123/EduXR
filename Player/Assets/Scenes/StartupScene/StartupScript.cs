using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Firebase.Firestore;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class StartupScript : MonoBehaviour
{
    private FirebaseFirestore _db;

    public GameObject ParentGameObject;
    public GameObject ButtonPrefab;

    // Start is called before the first frame update
    private async void Start() {
        _db = FirebaseFirestore.DefaultInstance;
        
        var collectionRef = _db.Collection("experiments");
        var snapshot = await collectionRef.GetSnapshotAsync();
        foreach (var documentSnapshot in snapshot.Documents) {
            var child = Instantiate(ButtonPrefab, ParentGameObject.transform);
            child.GetComponentInChildren<TextMeshProUGUI>().text = documentSnapshot.Id;
            child.GetComponentInChildren<Button>().onClick.AddListener(() => {
                PlayerPrefs.SetString("expname", documentSnapshot.Id);
                UnityEngine.SceneManagement.SceneManager.LoadScene("MainScene");
            });
        }
    }
}
