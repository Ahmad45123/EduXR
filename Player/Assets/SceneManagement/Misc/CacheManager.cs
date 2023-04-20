using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.SceneManagement.Misc {
    public static class CacheManager {
        public static byte[] getFileFromCache(string fileName) {
            Debug.Log($"Checking file {Path.Combine(Application.persistentDataPath, fileName)} in cache..");
            return File.Exists(Path.Combine(Application.persistentDataPath, fileName))
                ? File.ReadAllBytes(Path.Combine(Application.persistentDataPath, fileName))
                : null;
        }

        public static void putFileInCache(string fileName, byte[] file) {
            File.WriteAllBytes(Path.Combine(Application.persistentDataPath, fileName), file);
            Debug.Log($"Stored {Path.Combine(Application.persistentDataPath, fileName)} in cache!");
        }
    }
}
