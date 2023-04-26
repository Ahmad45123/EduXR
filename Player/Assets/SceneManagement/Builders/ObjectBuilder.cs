using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Core;
using Assets.SceneManagement.Misc;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.Assertions;
using GLTFast;
using Oculus.Interaction.Samples;

namespace Assets.SceneManagement.Builders {
    public class ObjectBuilder : MonoBehaviour {
        public ModelManager modelManager;
        public GameObject bigParent;

        public async Task<Core.Object> CreateObjectFromData(Models.ObjectData objectData) {
            GameObject gameObj;
            bool isCustomObj = false;
            switch (objectData.objectType) {
                case "cube":
                    gameObj = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    break;
                case "sphere":
                    gameObj = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    break;
                case "cylinder":
                    gameObj = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    break;
                case "capsule":
                    gameObj = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                    break;
                default:
                    gameObj = new GameObject();

                    var cachedData = await modelManager.GetModelBytes(objectData.objectType);
                    Assert.IsNotNull(cachedData);

                    var gltf = new GltfImport();
                    var success = await gltf.LoadGltfBinary(cachedData);
                    if (success) {
                        await gltf.InstantiateMainSceneAsync(gameObj.transform);
                    }

                    foreach (var renderer in gameObj.GetComponentsInChildren<Renderer>()) {
                        var collider = renderer.gameObject.AddComponent<MeshCollider>();
                        collider.convex = true;
                    }

                    isCustomObj = true;
                    break;
            }

            gameObj.name = objectData.objectName;
            gameObj.AddComponent<Rigidbody>();
            gameObj.transform.parent = bigParent.transform;

            var obj = new Core.Object(gameObj, isCustomObj);

            obj.UpdateScale(objectData.scale);
            obj.UpdateGravity(objectData.hasGravity);
            obj.UpdateColor(objectData.color);
            obj.UpdatePosition(objectData.position);
            obj.UpdateRotation(objectData.rotation);
            obj.UpdateGrabable(objectData.isGrabbable);

            gameObj.AddComponent<RespawnOnDrop>();

            return obj;
        }
    }
}
