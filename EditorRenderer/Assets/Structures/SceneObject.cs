﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using System.IO;
using System.Collections;

namespace Assets.Structures {
    public class SceneObject {
        public string objectName;
        public string objectType;
        public string color;
        public List<float> position;
        public List<float> rotation;
        public List<float> scale;
        public bool hasGravity;
        public bool isGrabbable;


        private GameObject _gameObject = null;

        private bool IsPrimitiveObject() {
            return objectType is "cube" or "sphere" or "cylinder" or "capsule";
        }

        public async void InitGameobject() {
            switch (objectType) {
                case "cube":
                    _gameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    break;
                case "sphere":
                    _gameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    break;
                case "cylinder":
                    _gameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    break;
                case "capsule":
                    _gameObject = GameObject.CreatePrimitive(PrimitiveType.Capsule);
                    break;
                default:
                    _gameObject = new GameObject(objectName);
                    await ModelDownloader.ApplyModelToObject(objectType, _gameObject);

                    foreach (var renderer in _gameObject.GetComponentsInChildren<Renderer>()) {
                        var collider = renderer.gameObject.AddComponent<MeshCollider>();
                        collider.convex = true;
                    }
                    break;
            }

            _gameObject.AddComponent<Rigidbody>();

            UpdateColor();
            UpdateGravity();
            UpdatePosition();
            UpdateScale();
            UpdateRotation();
        }

        public void UpdateColor() {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            if (!IsPrimitiveObject()) return;
            ColorUtility.TryParseHtmlString(color, out Color clr);
            _gameObject.GetComponent<Renderer>().material.color = clr;
        }

        public void UpdatePosition() {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            float xPos = position[0] / 10.0f * (0.716f - -0.438f) + -0.438f;
            float zPos = position[2] / 10.0f * (-0.579f - -0.017f) + -0.017f;
            _gameObject.transform.localPosition = new Vector3(xPos, position[1], zPos);
        }

        public void UpdateScale() {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            _gameObject.transform.localScale = new Vector3(scale[0], scale[1], scale[2]);
        }

        public void UpdateRotation() {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            _gameObject.transform.rotation = Quaternion.Euler(rotation[0], rotation[1], rotation[2]);
        }

        public void UpdateGravity() {
            if (!_gameObject) throw new Exception("InitGameobject first!");

            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.useGravity = hasGravity;
            rigidBody.isKinematic = true;
        }

        public void Dispose() {
            foreach (Transform child in _gameObject.transform) {
                UnityEngine.Object.Destroy(child.gameObject);
            }
            UnityEngine.Object.Destroy(_gameObject);
        }

        ~SceneObject() {
            Dispose();
        }
    }
}