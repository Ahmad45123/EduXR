using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.SceneManagement.Builders;
using Unity.VisualScripting;
using UnityEngine;

namespace Assets.SceneManagement {
    public class LabelSyncComponent : MonoBehaviour {
        public GameObject modelGameObject;

        void Update() {
            if (!modelGameObject) return;

            if (!modelGameObject.activeSelf) {
                transform.position = new Vector3(0, 100, 0);
                return;
            }

            // set rotation
            transform.LookAt(Camera.main.transform);

            // set position
            var parentRenderers = modelGameObject.GetComponentsInChildren<Renderer>();
            var bigBound = parentRenderers[0].bounds;
            foreach (var rr in parentRenderers) {
                bigBound.Encapsulate(rr.bounds);
            }

            transform.position = new Vector3(bigBound.center.x, bigBound.max.y + 0.01f, bigBound.center.z);

        }
    }
}