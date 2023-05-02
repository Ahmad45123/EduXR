using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using Assets.SceneManagement.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    public class GetPositionInstruction : DataInstruction {
        public GetPositionInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms) :
            base(inputs, parms) { }

        public override object GetOutput(string outputName) {
            string objectName = this.controls["object"];
            GameObject gameObject = GameObject.Find(objectName);

            var returnedPos = PositionConverter.ToDesigner(gameObject.transform.localPosition.x,
                gameObject.transform.localPosition.y, gameObject.transform.localPosition.z);

            return outputName switch {
                "x" => returnedPos.x,
                "y" => returnedPos.y,
                "z" => returnedPos.z,
                _ => throw new Exception("Unknown output passed!"),
            };
        }
    }
}