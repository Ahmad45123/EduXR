import { ClassicPreset } from 'rete';
import { execSocket } from './sockets';
import { BaseCustomControl } from './controls/BaseCustomControl';

export type ExportedNode = {
  name: string;
  controls: {
    [key: string]: string;
  };
  execOutputs: {
    [key: string]: string;
  };
  inputValues: {
    [key: string]: string;
  };
  inputsFrom: {
    [key: string]: {
      nodeId: string;
      outputName: string;
    };
  };
};

export function getSceneJSON(
  nodes: ClassicPreset.Node[],
  connections: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>[],
) {
  const respObj: { [key: string]: ExportedNode } = {};
  const refMap: { [key: string]: ClassicPreset.Node } = {};
  for (let node of nodes) {
    refMap[node.id] = node;
    respObj[node.id] = {
      name: node.label,
      execOutputs: {},
      controls: {},
      inputValues: {},
      inputsFrom: {},
    };

    for (let inputKey in node.inputs) {
      const input = node.inputs[inputKey];
      if (input?.control && input?.control instanceof BaseCustomControl) {
        respObj[node.id].inputValues[inputKey] = input.control.value;
      }
    }

    for (let controlKey in node.controls) {
      const control = node.controls[controlKey];
      if (control instanceof BaseCustomControl) {
        respObj[node.id].controls[controlKey] = control.value;
      }
    }
  }

  for (let conn of connections) {
    const fromSocket = refMap[conn.source].outputs[conn.sourceOutput]?.socket.name;
    if (fromSocket === execSocket.name) {
      respObj[conn.source].execOutputs[conn.sourceOutput] = conn.target;
    } else {
      respObj[conn.target].inputsFrom[conn.targetInput] = {
        nodeId: conn.source,
        outputName: conn.sourceOutput,
      };
    }
  }

  return respObj;
}
