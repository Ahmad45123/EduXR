﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    public class GetPositionInstruction : DataInstruction {
        public GetPositionInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms) :
            base(inputs, parms) { }

        public override object GetOutput(string outputName) {
            string objectName = this.controls["object"];
            GameObject gameObject = GameObject.Find(objectName);

            return outputName switch {
                "x" => gameObject.transform.localPosition.x,
                "y" => gameObject.transform.localPosition.y,
                "z" => gameObject.transform.localPosition.z,
                _ => throw new Exception("Unknown output passed!"),
            };
        }
    }
}