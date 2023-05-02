﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Misc;
using UnityEngine;

namespace Assets.Logic.Instructions.Properties {
    class GetRotationInstruction : DataInstruction {
        public GetRotationInstruction(Dictionary<string, InputParam> inputs, Dictionary<string, string> parms) :
            base(inputs, parms) { }

        public override object GetOutput(string outputName) {
            string objectName = this.controls["object"];
            GameObject gameObject = GameObject.Find(objectName);

            return outputName switch {
                "x" => gameObject.transform.rotation.eulerAngles.x,
                "y" => gameObject.transform.rotation.eulerAngles.y,
                "z" => gameObject.transform.rotation.eulerAngles.z,
                _ => throw new Exception("Unknown output passed!"),
            };
        }
    }
}