using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Core;
using UnityEngine;
using UnityEngine.Assertions;

namespace Assets.SceneManagement.Builders {
    public class ObjectBuilder : MonoBehaviour {
        /*public Core.Object CreateObjectFromData(Models.ObjectData objectData) {
            GameObject gameObject;
            switch (objectData.objectType) {
                case "cube":
                    gameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    break;
                case "sphere":
                    gameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    break;
                case "cylinder":
                    gameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    break;
                case "capsule":
                    gameObject = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                    break;
                default:
                    yield return ModelDownloader.CreateObjectFromModel(objectType, (obj) => _gameObject = obj);

                    foreach (var renderer in gameObject.GetComponentsInChildren<Renderer>()) {
                        var collider = renderer.gameObject.AddComponent<MeshCollider>();
                        collider.convex = true;
                    }
                    break;
            }

            gameObject.AddComponent<Rigidbody>();
            
            return new Core.Object(gameObject, false);
        }

        private static GameObject TryCreateFromCache(string modelName) {
            byte[] objFile = getFileFromCache(modelName + ".obj");
            if (objFile == null) return null;
            byte[] mtlFile = getFileFromCache(modelName + ".mtl");
            if (mtlFile != null) {
                return new OBJLoader().Load(new MemoryStream(objFile), new MemoryStream(mtlFile));
            }

            return new OBJLoader().Load(new MemoryStream(objFile));
        }*/
    }
}
