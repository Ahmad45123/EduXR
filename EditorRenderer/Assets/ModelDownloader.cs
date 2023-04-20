using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Assets.Extensions;
using GLTFast;


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

    private static void trySaveInCache(string name, byte[] objFile) {
        putFileInCache(name + ".glb", objFile);
#if !UNITY_EDITOR
        syncDB();
#endif
    }

    public static Dictionary<string, string> objLinks = new();

    public static async Task ApplyModelToObject(string modelName, GameObject objectToApplyOn) {
        var cachedData = getFileFromCache(modelName + ".glb");

        if (cachedData != null) {
            Debug.Log($"Found object {modelName} in cache and used it.");
        }
        else {
            var objPath = objLinks[modelName];

            using var objRequest = UnityWebRequest.Get(objPath);
            await objRequest.SendWebRequest();

            cachedData = objRequest.downloadHandler.data;
            trySaveInCache(modelName, objRequest.downloadHandler.data);
        }

        var gltf = new GltfImport();
        var success = await gltf.LoadGltfBinary(cachedData);
        if (success) {
            success = await gltf.InstantiateMainSceneAsync(objectToApplyOn.transform);
            if (success) {
                Debug.Log($"Model {modelName} loaded successfully.");
            }
        }
    }
}
