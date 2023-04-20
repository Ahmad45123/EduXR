using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Models;
using UnityEngine;

namespace Assets.SceneManagement.Core {
    public class Object {
        private readonly bool _hasCustomMaterial;
        private readonly GameObject _gameObject;

        public Object(GameObject obj, bool customMaterial) {
            _gameObject = obj;
            _hasCustomMaterial = customMaterial;
        }

        public void UpdateColor(string color) {
            ColorUtility.TryParseHtmlString(color, out Color clr);

            if (!_hasCustomMaterial) {
                foreach (var renderer in _gameObject.GetComponentsInChildren<Renderer>()) {
                    renderer.material.color = clr;
                }
            }
            else {
                _gameObject.GetComponent<Renderer>().material.color = clr;
            }
        }

        public void UpdatePosition(List<float> position) {
            float xPos = position[0] / 10.0f * (0.716f - -0.438f) + -0.438f;
            float zPos = position[2] / 10.0f * (-0.579f - -0.017f) + -0.017f;
            _gameObject.transform.localPosition = new Vector3(xPos, position[1], zPos);
        }

        public void UpdateScale(List<float> scale) {
            _gameObject.transform.localScale = new Vector3(scale[0], scale[1], scale[2]);
        }

        public void UpdateRotation(List<float> rotation) {
            _gameObject.transform.rotation = Quaternion.Euler(rotation[0], rotation[1], rotation[2]);
        }

        public void UpdateGravity(bool hasGravity) {
            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.useGravity = hasGravity;
        }
    }
}