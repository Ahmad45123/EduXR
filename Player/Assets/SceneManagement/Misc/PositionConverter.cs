using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Assets.SceneManagement.Misc {
    public static class PositionConverter {
        public static Vector3 ToDesigner(float xPos, float y, float zPos) {
            float x = (xPos - (-0.438f)) / (0.716f - (-0.438f)) * 10.0f;
            float z = (zPos - (-0.017f)) / (-0.579f - (-0.017f)) * 10.0f;
            return new Vector3(x, y, z);
        }


        public static Vector3 FromDesigner(float x, float y, float z) {
            float xPos = x / 10.0f * (0.716f - -0.438f) + -0.438f;
            float zPos = z / 10.0f * (-0.579f - -0.017f) + -0.017f;
            return new Vector3(xPos, y, zPos);
        }
    }
}
