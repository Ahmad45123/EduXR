using Dummiesman;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;
using System.Runtime.InteropServices;


public static class ModelDownloader
{
    [DllImport("__Internal")]
    private static extern void syncDB();

    private static byte[] getFileFromCache(string fileName) {
        Debug.Log($"Checking file {Path.Combine(Application.persistentDataPath, fileName)} in cache..");
        if (File.Exists(Path.Combine(Application.persistentDataPath, fileName))) {
            return File.ReadAllBytes(Path.Combine(Application.persistentDataPath, fileName));
        }
        return null;
    }

    private static void putFileInCache(string fileName, byte[] file) {
        File.WriteAllBytes(Path.Combine(Application.persistentDataPath, fileName), file);
        Debug.Log($"Stored {Path.Combine(Application.persistentDataPath, fileName)} in cache!");
    }

    private static GameObject tryGetFromCache(string name) {
        byte[] objFile = getFileFromCache(name + ".obj");
        if (objFile == null) return null;
        byte[] mtlFile = getFileFromCache(name + ".mtl");
        if(mtlFile != null) {
            return new OBJLoader().Load(new MemoryStream(objFile), new MemoryStream(mtlFile));
        }

        return new OBJLoader().Load(new MemoryStream(objFile));
    }

    private static void trySaveInCache(string name, byte[] objFile, byte[] mtlFile = null) {
        putFileInCache(name + ".obj", objFile);
        if(mtlFile != null) {
            putFileInCache(name + ".mtl", mtlFile);
        }
        syncDB();
    }

    public static Dictionary<string, string> objLinks = new();
    public static Dictionary<string, string> mtlLinks = new();

    public static IEnumerator CreateObjectFromModel(string modelName, System.Action<GameObject> onComplete) {
        GameObject gameObject = tryGetFromCache(modelName);

        if (gameObject != null) {
            Debug.Log($"Found object {modelName} in cache and used it.");
            onComplete(gameObject);
            yield break;
        }

        string objPath = objLinks[modelName];
        string mtlPath = mtlLinks[modelName];

        using (UnityWebRequest objRequest = UnityWebRequest.Get(objPath)) {
            yield return objRequest.SendWebRequest();

            if (string.IsNullOrWhiteSpace(mtlPath)) {
                gameObject = new OBJLoader().Load(new MemoryStream(objRequest.downloadHandler.data));
                trySaveInCache(modelName, objRequest.downloadHandler.data);
            } 
            else {
                using UnityWebRequest mtlRequest = UnityWebRequest.Get(mtlPath);
                yield return mtlRequest.SendWebRequest();
                gameObject = new OBJLoader().Load(new MemoryStream(objRequest.downloadHandler.data), new MemoryStream(mtlRequest.downloadHandler.data));
                trySaveInCache(modelName, objRequest.downloadHandler.data, mtlRequest.downloadHandler.data);
            }
        }

        onComplete(gameObject);
    }
}
