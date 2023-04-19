using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.SceneManagement.Builders {
    public class ObjectBuilder : MonoBehaviour {
        public Core.Object CreateObjectFromData(Models.ObjectData objectData) {
            Core.Object obj = new Core.Object();

            /* Object creation */
            obj.gameObject = new GameObject();
            // ...

            return obj;
        }
    }
}
