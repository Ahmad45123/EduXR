using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.Structures
{
    public class SceneObject
    {
        public string objectName;
        public string objectType;
        public List<float> position;
        public List<float> rotation;
        public List<float> scale;
        public bool hasGravity;
        public bool isGrabbable;


        private GameObject _gameObject = null;

        public void InitGameobject(GameObject parent)
        {
            _gameObject = new GameObject(objectName);
            // _gameObject.transform.parent = parent.transform;

            _gameObject.AddComponent<MeshFilter>();
            var collider = _gameObject.AddComponent<MeshCollider>();
            _gameObject.AddComponent<MeshRenderer>();
            _gameObject.AddComponent<Rigidbody>();

            collider.convex = true;

            UpdateModel();
            UpdateGravity();
            UpdatePosition();
            UpdateScale();
        }

        public void UpdateModel()
        {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Mesh cubeMesh = cube.GetComponent<MeshFilter>().mesh;

            MeshFilter filter = _gameObject.GetComponent<MeshFilter>();
            MeshCollider collider = _gameObject.GetComponent<MeshCollider>();
            filter.mesh = cubeMesh;
            collider.sharedMesh = cubeMesh;
            _gameObject.GetComponent<Renderer>().material.color = Color.green;

            GameObject.Destroy(cube);
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
