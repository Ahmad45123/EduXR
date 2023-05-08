import { ClassicPreset,NodeEditor } from 'rete';
import { AreaExtensions,AreaPlugin,NodeView } from 'rete-area-plugin';


import { AreaExtra, BaseConnection, BaseNode, Schemes } from './base_types';

import { BaseCustomControl } from './controls/BaseCustomControl';

import {
  ApplyForceOnObjectNode,
  CompareNode,
  EvalNode,
  EvalStringNode,
  GetDistanceBetweenNode,
  GetElapsedTimeNode,
  GetPositionNode,
  GetRotationNode,
  GetScaleNode,
  GetSpeedNode,
  GetTimeSinceLastLoopNode,
  GetVariableNode,
  GotoSceneNode,
  NodeType,
  SceneLoadNode,
  SceneLoopNode,
  SetBouncinessNode,
  SetColorNode,
  SetDynamicFrictionNode,
  SetMassNode,
  SetObjectDescriptionNode,
  SetPositionNode,
  SetRotationNode,
  SetScaleNode,
  SetStaticFrictionNode,
  SetVariableNode,
  SetVisibleNode,
  ShowMessageNode,
} from './nodes';
import { execSocket } from './sockets';

export type ExportedNode = {
  name: NodeType;
  position: [number, number];
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
  areaData: Map<string, NodeView>,
): ExportedNodes {
  const respObj: { [key: string]: ExportedNode } = {};
  const refMap: { [key: string]: ClassicPreset.Node } = {};
  for (let node of nodes) {
    refMap[node.id] = node;
    respObj[node.id] = {
      name: node.label as NodeType,
      position: [
        areaData.get(node.id)?.position.x ?? 0,
        areaData.get(node.id)?.position.y ?? 0,
      ],
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

export async function importIntoEditor(
  editor: NodeEditor<Schemes>,
  areaPlugin: AreaPlugin<Schemes, AreaExtra>,
  nodes: ExportedNodes,
) {
  // First we need to create all the nodes
  const nodeMap: { [key: string]: BaseNode } = {};
  for (let nodeId in nodes) {
    const node = nodes[nodeId];
    let actualNode: BaseNode;
    switch (node.name) {
      case 'SceneLoad':
        actualNode = new SceneLoadNode();
        break;
      case 'SceneLoop':
        actualNode = new SceneLoopNode();
        break;
      case 'GotoScene':
        actualNode = new GotoSceneNode();
        break;
      case 'ShowMessage':
        actualNode = new ShowMessageNode();
        break;
      case 'Compare':
        actualNode = new CompareNode();
        break;
      case 'Eval':
        actualNode = new EvalNode();
        break;
      case 'GetPosition':
        actualNode = new GetPositionNode();
        break;
      case 'GetRotation':
        actualNode = new GetRotationNode();
        break;
      case 'GetScale':
        actualNode = new GetScaleNode();
        break;
      case 'SetPosition':
        actualNode = new SetPositionNode();
        break;
      case 'SetRotation':
        actualNode = new SetRotationNode();
        break;
      case 'SetScale':
        actualNode = new SetScaleNode();
        break;
      case 'SetVisible':
        actualNode = new SetVisibleNode();
        break;
      case 'SetBounciness':
        actualNode = new SetBouncinessNode();
        break;
      case 'SetDynamicFriction':
        actualNode = new SetDynamicFrictionNode();
        break;
      case 'SetMass':
        actualNode = new SetMassNode();
        break;
      case 'SetStaticFriction':
        actualNode = new SetStaticFrictionNode();
        break;
      case 'EvalString':
        actualNode = new EvalStringNode();
        break;
      case 'GetVariable':
        actualNode = new GetVariableNode();
        break;
      case 'SetVariable':
        actualNode = new SetVariableNode();
        break;
      case 'SetObjectDescription':
        actualNode = new SetObjectDescriptionNode();
        break;
      case 'ApplyForceOnObject':
        actualNode = new ApplyForceOnObjectNode();
        break;
      case 'GetTimeSinceLastLoopNode':
        actualNode = new GetTimeSinceLastLoopNode();
        break;
      case 'GetSpeed':
        actualNode = new GetSpeedNode();
        break;
      case 'GetElapsedTime':
        actualNode = new GetElapsedTimeNode();
        break;
      case 'SetColor':
        actualNode = new SetColorNode();
        break;
      case 'GetDistanceBetween':
        actualNode = new GetDistanceBetweenNode();
        break;
    }
    actualNode.id = nodeId;
    nodeMap[nodeId] = actualNode;
    await editor.addNode(actualNode);
    await areaPlugin.translate(nodeId, {
      x: node.position[0],
      y: node.position[1],
    });
  }

  for (let nodeId in nodes) {
    const node = nodes[nodeId];

    // Add the exec connections
    for (let key in node.execOutputs) {
      const toId = node.execOutputs[key];
      await editor.addConnection(
        new BaseConnection(nodeMap[nodeId], key, nodeMap[toId], 'exec'),
      );
    }

    // Add the data connections
    for (let key in node.inputsFrom) {
      const from = node.inputsFrom[key];
      await editor.addConnection(
        new BaseConnection(nodeMap[from.nodeId], from.outputName, nodeMap[nodeId], key),
      );
    }

    // Set the input control values
    for (let key in node.inputValues) {
      const input = nodeMap[nodeId].inputs[key];
      if (input?.control && input?.control instanceof BaseCustomControl) {
        input.control.value = node.inputValues[key];
      }
    }

    // Set the control values
    for (let key in node.controls) {
      const control = nodeMap[nodeId].controls[key];
      if (control instanceof BaseCustomControl) {
        control.value = node.controls[key];
      }
    }
  }

  AreaExtensions.zoomAt(areaPlugin, editor.getNodes());
}

export type ExportedNodes = {
  [key: string]: ExportedNode;
};
