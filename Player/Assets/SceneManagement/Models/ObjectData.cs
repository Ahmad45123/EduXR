using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assets.SceneManagement.Models {
    public class ObjectData {
        public string objectName;
        public string objectType;
        public string color;
        public List<float> position;
        public List<float> rotation;
        public List<float> scale;
        public bool hasGravity;
        public bool isGrabbable;
    }
}
