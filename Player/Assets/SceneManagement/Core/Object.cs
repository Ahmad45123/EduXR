using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Builders;
using Assets.SceneManagement.Misc;
using Assets.SceneManagement.Models;
using Oculus.Interaction;
using Oculus.Interaction.Grab.GrabSurfaces;
using Oculus.Interaction.HandGrab;
using TMPro;
using UnityEngine;

namespace Assets.SceneManagement.Core {
    public class Object {
        public readonly string Name;
        private readonly bool _hasCustomMaterial;
        private readonly GameObject _gameObject;
        private readonly GameObject _labelGameObject;

        public Object(GameObject obj, GameObject label, bool customMaterial) {
            _gameObject = obj;
            _labelGameObject = label;
            _hasCustomMaterial = customMaterial;
            Name = obj.name;
        }

        public void Destroy() {
            UnityEngine.Object.Destroy(_gameObject);
            UnityEngine.Object.Destroy(_labelGameObject);
        }

        public void UpdateColor(string color) {
            ColorUtility.TryParseHtmlString(color, out Color clr);

            if (!_hasCustomMaterial) {
                _gameObject.GetComponent<Renderer>().material.color = clr;
            }
        }

        public Vector3 GetPosition() {
            var returnedPos = PositionConverter.ToDesigner(_gameObject.transform.localPosition.x,
                _gameObject.transform.localPosition.y, _gameObject.transform.localPosition.z);
            return returnedPos;
        }
        public void UpdatePosition(List<float> position) {
            _gameObject.transform.localPosition = PositionConverter.FromDesigner(position[0], position[1], position[2]);
        }

        public Vector3 GetScale() {
            return _gameObject.transform.localScale;
        }
        public void UpdateScale(List<float> scale) {
            _gameObject.transform.localScale = new Vector3(scale[0], scale[1], scale[2]);
        }

        public Vector3 GetRotation() {
            return _gameObject.transform.rotation.eulerAngles;
        }
        public void UpdateRotation(List<float> rotation) {
            _gameObject.transform.rotation = Quaternion.Euler(rotation[0], rotation[1], rotation[2]);
        }

        public void UpdateGravity(bool hasGravity) {
            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.useGravity = hasGravity;
            rigidBody.isKinematic = !hasGravity;
        }

        public void UpdateGrabable(bool isGrabable) {
            if (!isGrabable) {
                UnityEngine.Object.Destroy(_gameObject.GetComponent<HandGrabInteractable>());
                UnityEngine.Object.Destroy(_gameObject.GetComponent<PhysicsGrabbable>());
                UnityEngine.Object.Destroy(_gameObject.GetComponent<Grabbable>());
                return;
            }

            var rigidbody = _gameObject.GetComponent<Rigidbody>();
            
            var grabable = _gameObject.AddComponent<Grabbable>();
            grabable.TransferOnSecondSelection = true;

            var physicsGrabable = _gameObject.AddComponent<PhysicsGrabbable>();
            physicsGrabable.InjectAllPhysicsGrabbable(grabable, rigidbody);
            physicsGrabable.InjectOptionalScaleMassWithSize(true);
                
            var handGrabInteractable = _gameObject.AddComponent<HandGrabInteractable>();
            handGrabInteractable.InjectPointableElement(grabable);
            handGrabInteractable.InjectRigidbody(rigidbody);
            handGrabInteractable.InjectOptionalPhysicsGrabbable(physicsGrabable);
        }

        public void UpdateVisible(bool state) {
            _gameObject.SetActive(state);
        }

        public void UpdateStaticFriction(float value) {
            var colliders = _gameObject.GetComponentsInChildren<Collider>();
            foreach (var collider in colliders) {
                if (collider.material == null)
                    collider.material = new PhysicMaterial();
                collider.material.staticFriction = value;
            }
        }

        public void UpdateDynamicFriction(float value) {
            var colliders = _gameObject.GetComponentsInChildren<Collider>();
            foreach (var collider in colliders) {
                if (collider.material == null)
                    collider.material = new PhysicMaterial();
                collider.material.dynamicFriction = value;
            }
        }

        public void UpdateBounciness(float value) {
            var colliders = _gameObject.GetComponentsInChildren<Collider>();
            foreach (var collider in colliders) {
                if (collider.material == null)
                    collider.material = new PhysicMaterial();
                collider.material.bounciness = value;
            }
        }

        public void UpdateMass(float value) {
            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.mass = value;
        }

        public float GetSpeed() {
            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            return rigidBody.velocity.magnitude;
        }

        public void SetDescription(string desc) {
            _labelGameObject.GetComponent<TextMeshPro>().text = desc;
        }

        public void ApplyForce(Vector3 force) {
            var rigidBody = _gameObject.GetComponent<Rigidbody>();
            rigidBody.AddForce(force);
        }
    }
}