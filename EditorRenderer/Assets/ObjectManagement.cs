using Assets.Structures;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectManagement : MonoBehaviour
{
    Dictionary<string, SceneObject> sceneObjsDict = new();

    class SetModelObjectParams {
        public string objectModelName;
        public string objURL;
    }
    void SetModelObject(string input) {
        var obj = JsonUtility.FromJson<SetModelObjectParams>(input);
        ModelDownloader.objLinks[obj.objectModelName] = obj.objURL;
        Debug.Log($"Set model of type {obj.objectModelName} to {obj.objURL}.");
    }

    void CreateObject(string objectJson)
    {
        var obj = JsonUtility.FromJson<SceneObject>(objectJson);
        /*if (sceneObjsDict.ContainsKey(obj.objectName)) {
            Debug.Log($"Created duplicate object with name: ${obj.objectName}");
            return;
        }*/
        obj.InitGameobject();
        sceneObjsDict[obj.objectName] = obj;
    }

    void DeleteObject(string objectName) {
        sceneObjsDict[objectName].Dispose();
        sceneObjsDict.Remove(objectName);
    }

    class PositionParams
    {
        public string objectName;
        public float x;
        public float y;
        public float z;
    }
    void SetObjectPosition(string input)
    {
        var obj = JsonUtility.FromJson<PositionParams>(input);
        sceneObjsDict[obj.objectName].position = new List<float>() { obj.x, obj.y, obj.z };
        sceneObjsDict[obj.objectName].UpdatePosition();
    }
    void SetObjectRotation(string input) {
        var obj = JsonUtility.FromJson<PositionParams>(input);
        sceneObjsDict[obj.objectName].rotation = new List<float>() { obj.x, obj.y, obj.z };
        sceneObjsDict[obj.objectName].UpdateRotation();
    }
    void SetObjectScale(string input) {
        var obj = JsonUtility.FromJson<PositionParams>(input);
        sceneObjsDict[obj.objectName].scale = new List<float>() { obj.x, obj.y, obj.z };
        sceneObjsDict[obj.objectName].UpdateScale();
    }

    class SetObjectCollorParams {
        public string objectName;
        public string color;
    }
    void SetObjectColor(string input) {
        var obj = JsonUtility.FromJson<SetObjectCollorParams>(input);
        sceneObjsDict[obj.objectName].color = obj.color;
        sceneObjsDict[obj.objectName].UpdateColor();
    }

    /*private void Start()
    {
        ModelDownloader.objLinks.Add("truck", "https://firebasestorage.googleapis.com/v0/b/eduvr-fd56d.appspot.com/o/objectTypes%2Fmainuser%2Fthe%20truck.glb?alt=media&token=e30044ae-5a80-4a01-b987-82bf5cf8c62d");
        CreateObject("{\"objectName\":\"fhfgh\",\"objectType\":\"truck\",\"position\":[0,0.28,0],\"rotation\":[0,0,0],\"scale\":[0.08,0.08,0.08],\"hasGravity\":false,\"isGrabbable\":true}");
    }*/
}
