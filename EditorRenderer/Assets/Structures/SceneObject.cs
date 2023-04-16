using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using Dummiesman;
using UnityEngine.Networking;
using System.IO;
using System.Collections;

namespace Assets.Structures
{
    public class SceneObject
    {
        public string objectName;
        public string objectType;
        public string objectObjPath;
        public List<float> position;
        public List<float> rotation;
        public List<float> scale;
        public bool hasGravity;
        public bool isGrabbable;


        private GameObject _gameObject = null;

        public IEnumerator InitGameobject()
        {
            using (UnityWebRequest webRequest = UnityWebRequest.Get(objectObjPath))
            {
                webRequest.downloadHandler = new DownloadHandlerBuffer();
                yield return webRequest.SendWebRequest();

                _gameObject = new OBJLoader().Load(new MemoryStream(webRequest.downloadHandler.data));
            }

            foreach (var renderer in _gameObject.GetComponentsInChildren<Renderer>())
            {
                var collider = renderer.gameObject.AddComponent<MeshCollider>();
                collider.convex = true;
            }
            _gameObject.AddComponent<Rigidbody>();

            UpdateColor();
            UpdateGravity();
            UpdatePosition();
            UpdateScale();
        }

        public void UpdateColor()
        {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            foreach(var renderer in _gameObject.GetComponentsInChildren<Renderer>())
            {
                renderer.material.color = Color.green;
            }
        }

        public void UpdatePosition()
        {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            float xPos = position[0] / 10.0f * (0.716f - -0.438f) + -0.438f;
            float zPos = position[2] / 10.0f * (-0.579f - -0.017f) + -0.017f;
            _gameObject.transform.localPosition = new Vector3(xPos, position[1], zPos);
        }

        public void UpdateScale()
        {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            _gameObject.transform.localScale = new Vector3(scale[0], scale[1], scale[2]);
        }

        public void UpdateGravity()
        {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.useGravity = hasGravity;
            rigidBody.isKinematic = true;
        }

        ~SceneObject()
        {
            UnityEngine.Object.Destroy(_gameObject);
        }
    }
}
