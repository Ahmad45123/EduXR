using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Instructions;
using Assets.Logic.Instructions.Actions;
using Assets.Logic.Instructions.Core;
using Assets.Logic.Instructions.Deciders;
using Assets.Logic.Instructions.Mutators;
using Assets.Logic.Instructions.Properties;
using Assets.Logic.Instructions.Variables;
using Assets.Logic.Misc;
using Assets.SceneManagement.Models;

namespace Assets.Logic {
    public class LogicBuilder {

        private readonly Dictionary<string, SceneLogicData> _logicData;
        private readonly Dictionary<string, DataInstruction> _cache;

        public LogicBuilder(Dictionary<string, SceneLogicData> logicData) {
            _logicData = logicData;
            _cache = new Dictionary<string, DataInstruction>();
        }

        private static DataInstruction CreateInstruction(string type, ref Dictionary<string, string> controls,
            ref Dictionary<string, InputParam> inputs, ref Dictionary<string, ExecInstruction> nextInstructs) {
            return type switch {
                "SetPosition" => new SetPositionInstruction(inputs, controls, nextInstructs),
                "SetRotation" => new SetRotationInstruction(inputs, controls, nextInstructs),
                "SetScale" => new SetScaleInstruction(inputs, controls, nextInstructs),
                "SceneLoop" => new SceneLoopInstruction(inputs, controls, nextInstructs),
                "SceneLoad" => new SceneLoadInstruction(inputs, controls, nextInstructs),
                "Compare" => new CompareInstruction(inputs, controls, nextInstructs),
                "SetVisible" => new SetVisibleInstruction(inputs, controls, nextInstructs),
                "GetPosition" => new GetPositionInstruction(inputs, controls),
                "GetRotation" => new GetRotationInstruction(inputs, controls),
                "GetScale" => new GetScaleInstruction(inputs, controls),
                "Eval" => new EvalInstruction(inputs, controls),
                "SetBounciness" => new SetBouncinessInstruction(inputs, controls, nextInstructs),
                "SetStaticFriction" => new SetStaticFrictionInstruction(inputs, controls, nextInstructs),
                "SetDynamicFriction" => new SetDynamicFrictionInstruction(inputs, controls, nextInstructs),
                "SetMass" => new SetMassInstruction(inputs, controls, nextInstructs),
                "GetElapsedTime" => new GetElapsedTimeInstruction(inputs, controls),
                "SetVariable" => new SetVariableInstruction(inputs, controls, nextInstructs),
                "GetVariable" => new GetVariableInstruction(inputs, controls),
                _ => throw new Exception("Unknown node type")
            };
        }

        private DataInstruction ConvertInstruction(string id, SceneLogicData logicNode) {
            if (_cache.TryGetValue(id, out var instruction)) return instruction;

            var controls = logicNode.controls;

            Dictionary<string, InputParam> inputs = new();
            Dictionary<string, ExecInstruction> nextInstructs = new();

            foreach (var pair in logicNode.execOutputs) {
                nextInstructs[pair.Key] = (ExecInstruction)ConvertInstruction(pair.Value, _logicData[pair.Value]);
            }

            foreach (var pair in logicNode.inputValues) {
                var inst = new ConstantValueInstruction(new Dictionary<string, InputParam>(),
                    new Dictionary<string, string>() { { "value", pair.Value } });
                inputs[pair.Key] = new InputParam(inst, "value");
            }

            foreach (var pair in logicNode.inputsFrom) {
                var dtaInstruction = ConvertInstruction(pair.Value.nodeId, _logicData[pair.Value.nodeId]);
                inputs[pair.Key] = new InputParam(dtaInstruction, pair.Value.outputName);
            }

            _cache[id] = CreateInstruction(logicNode.name, ref controls, ref inputs, ref nextInstructs);
            return _cache[id];
        }

        public DataInstruction[] GetInstructions() {
            foreach (var logicItem in _logicData) {
                ConvertInstruction(logicItem.Key, logicItem.Value);
            }

            return _cache.Values.ToArray();
        }
    }
}
