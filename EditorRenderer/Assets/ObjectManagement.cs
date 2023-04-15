using Assets.Structures;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectManagement : MonoBehaviour
{
    public GameObject rootGameObject;

    Dictionary<string, SceneObject> sceneObjsDict = new Dictionary<string, SceneObject>();

    void CreateObject(string objectJson)
    {
        var obj = JsonUtility.FromJson<SceneObject>(objectJson);
        obj.InitGameobject(rootGameObject);
        sceneObjsDict[obj.objectName] = obj;
    }


    class ObjectPositionParams
    {
        public string objectName;
        public float x;
        public float y;
        public float z;
    }
    void SetObjectPosition(string input)
    {
        var obj = JsonUtility.FromJson<ObjectPositionParams>(input);
        sceneObjsDict[obj.objectName].position = new List<float>() { obj.x, obj.y, obj.z };
        sceneObjsDict[obj.objectName].UpdatePosition();
    }
}
