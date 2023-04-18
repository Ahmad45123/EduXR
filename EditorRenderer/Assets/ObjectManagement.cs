using Assets.Structures;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectManagement : MonoBehaviour
{
    Dictionary<string, SceneObject> sceneObjsDict = new Dictionary<string, SceneObject>();

    class SetModelObjectParams {
        public string objectModelName;
        public string objURL;
        public string mtlURL = null;
    }
    void SetModelObject(string input) {
        var obj = JsonUtility.FromJson<SetModelObjectParams>(input);
        ModelDownloader.objLinks[obj.objectModelName] = obj.objURL;
        if(obj.mtlURL != null) {
            ModelDownloader.mtlLinks[obj.objectModelName] = obj.mtlURL;
        }
        Debug.Log($"Set model of type {obj.objectModelName} to {obj.objURL}.");
    }

    void CreateObject(string objectJson)
    {
        var obj = JsonUtility.FromJson<SceneObject>(objectJson);
        StartCoroutine(obj.InitGameobject());
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
        CreateObject("{\"objectName\":\"fhfgh\",\"objectType\":\"custom\",\"objectObjPath\":\"https://firebasestorage.googleapis.com/v0/b/eduvr-fd56d.appspot.com/o/truck.obj?alt=media&token=db8d54fa-640b-4dae-a91a-d4721e2d5e74\",\"objectMtlPath\":\"https://firebasestorage.googleapis.com/v0/b/eduvr-fd56d.appspot.com/o/truck.mtl?alt=media&token=a9f6c96b-d9aa-4169-9d3d-3002afc1f4a0\",\"position\":[0,0.28,0],\"rotation\":[0,0,0],\"scale\":[0.08,0.08,0.08],\"hasGravity\":false,\"isGrabbable\":true}");
    }*/
}
