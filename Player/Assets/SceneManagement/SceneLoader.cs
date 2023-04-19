using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using Firebase.Firestore;
using Firebase.Extensions;
using TMPro;

public class SceneLoader : MonoBehaviour
{
    private FirebaseFirestore db;

    public GameObject thePrefab;
    public GameObject childrenNode;

    // Start is called before the first frame update
    void Start()
    {
        db = FirebaseFirestore.DefaultInstance;

        var theCube = GameObject.CreatePrimitive(PrimitiveType.Cube).GetComponent<MeshFilter>().mesh;
        var theSphere = GameObject.CreatePrimitive(PrimitiveType.Sphere).GetComponent<MeshFilter>().mesh;
        var theCylinder = GameObject.CreatePrimitive(PrimitiveType.Capsule).GetComponent<MeshFilter>().mesh;

        CollectionReference objectsRef = db.Collection("objects");
        objectsRef.GetSnapshotAsync().ContinueWithOnMainThread(task =>
        {
            QuerySnapshot snapshot = task.Result;
            foreach (DocumentSnapshot documentSnapshot in snapshot.Documents) {
                Dictionary<string, object> document = documentSnapshot.ToDictionary();
                var currentObj = Instantiate(thePrefab, childrenNode.transform);

                MeshFilter filter = currentObj.GetComponent<MeshFilter>();
                MeshCollider collider = currentObj.GetComponent<MeshCollider>();
                filter.mesh = (string)document["type"] == "cube" ? theCube : (string)document["type"] == "sphere" ? theSphere : theCylinder;
                collider.sharedMesh = (string)document["type"] == "cube" ? theCube : (string)document["type"] == "sphere" ? theSphere : theCylinder;


                // Set currentObj transform relative to parent based on the value of dpcument["position"][0] and document["position"][1]
                // document values will range from 0 to 10 and the real positions for the X coordinate is -0.438 to 0.716 while Z coordinate is from -0.017 to -0.579.
                // Fix the Y coordinate to 0.438
                // Set the scale of the object to 0.8
                var lst = (List<object>)document["position"];
                float xPos = (float)(((double)lst[0]) / 10.0f * (0.716f - -0.438f) + -0.438f);
                float zPos = (float)(((double)lst[1]) / 10.0f * (-0.579f - -0.017f) + -0.017f);
                currentObj.transform.localPosition = new Vector3(xPos, 0.438f, zPos);
                currentObj.transform.localScale = new Vector3(0.08f, 0.08f, 0.08f);

                // Set the color of the object based on the value of document["color"]
                // document["color"] will be either "red", "green", or "blue"
                currentObj.GetComponent<Renderer>().material.color = ToColor((string)document["color"]);

                currentObj.GetComponent<CollisionHandler>().textField = theCollisionPlace;
                currentObj.name = (string)document["name"];

                Debug.Log("Created at positon " + xPos);
                currentObj.SetActive(true);
            }
        });
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
