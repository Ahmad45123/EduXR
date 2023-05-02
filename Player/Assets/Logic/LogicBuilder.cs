using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assets.Logic.Instructions;
using Assets.Logic.Instructions.Properties;
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

        private DataInstruction CreateInstruction(string type, ref Dictionary<string, string> controls,
            ref Dictionary<string, InputParam> inputs, ref Dictionary<string, ExecInstruction> nextInstructs) {
            return type switch {
                "SetPosition" => new SetPositionInstruction(inputs, controls, nextInstructs),
                "GetPosition" => new GetPositionInstruction(inputs, controls),
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
