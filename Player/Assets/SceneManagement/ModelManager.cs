using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Extensions;
using Assets.SceneManagement.Misc;
using Firebase.Storage;
using UnityEngine;
using UnityEngine.Networking;

namespace Assets.SceneManagement {
    public class ModelManager : MonoBehaviour {

        public string username;

        private FirebaseStorage _storage;

        void Start() {
            _storage = FirebaseStorage.DefaultInstance;
        }

        public async Task<byte[]> GetModelBytes(string modelName) {
            var bytes = CacheManager.GetFileFromCache(modelName + ".glb");
            if (bytes != null) {
                return bytes;
            }

            StorageReference pathReference = _storage.GetReference($"objectTypes/{username}/{modelName}.glb");
            var downloadUrl = await pathReference.GetDownloadUrlAsync();
            using var objRequest = UnityWebRequest.Get(downloadUrl);
            await objRequest.SendWebRequest();
            CacheManager.PutFileInCache(modelName + ".glb", objRequest.downloadHandler.data);
            return objRequest.downloadHandler.data;
        }
    }
}
