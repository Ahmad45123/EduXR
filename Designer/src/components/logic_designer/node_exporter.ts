import { ClassicPreset, NodeEditor } from 'rete';
import { execSocket } from './sockets';
import { BaseCustomControl } from './controls/BaseCustomControl';
import { AreaExtensions, AreaPlugin, NodeView } from 'rete-area-plugin';
import { AreaExtra, BaseConnection, BaseNode, NodeType, Schemes } from './base_types';
import { OnCollisionNode } from './nodes/OnCollisionNode';
import { SceneLoadNode } from './nodes/SceneLoadNode';
import { GotoSceneNode } from './nodes/GotoSceneNode';
import { AskQuestionNode } from './nodes/ui/AskQuestionNode';
import { ShowMessageNode } from './nodes/ui/ShowMessageNode';

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
      case 'OnCollision':
        actualNode = new OnCollisionNode();
        break;
      case 'SceneLoad':
        actualNode = new SceneLoadNode();
        break;
      case 'GotoScene':
        actualNode = new GotoSceneNode();
        break;
      case 'AskQuestion':
        actualNode = new AskQuestionNode();
        break;
      case 'ShowMessage':
        actualNode = new ShowMessageNode();
        break;
      default:
        throw new Error(`Unknown node type: ${node.name}`);
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
        new BaseConnection(nodeMap[nodeId], 'exec', nodeMap[toId], 'exec'),
      );
    }

    // Add the data connections
    for (let key in node.inputsFrom) {
      const from = node.inputsFrom[key];
      await editor.addConnection(
        new BaseConnection(nodeMap[from.nodeId], from.outputName, nodeMap[nodeId], key),
      );
    }
  }

  AreaExtensions.zoomAt(areaPlugin, editor.getNodes());
}

export type ExportedNodes = {
  [key: string]: ExportedNode;
};
