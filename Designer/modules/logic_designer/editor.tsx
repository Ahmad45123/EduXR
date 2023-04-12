import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import {
  ReactRenderPlugin,
  Presets,
  ReactArea2D
} from "rete-react-render-plugin";
import { CustomNode } from "./components/CustomNode";
import { execSocket, stringSocket } from "./sockets";
import { ExecSocket } from "./components/ExecSocket";
import { GotoSceneNode } from './nodes/GotoSceneNode';
import { IfNode } from './nodes/IfNode';
import { OnCollisionNode } from './nodes/OnCollisionNode';
import { ComboBoxControl, ComboBoxControlImpl } from './controls/ComboBoxControl';
import { InputBoxControl, InputBoxControlImpl } from './controls/InputBoxControl';
import { getSceneJSON } from './nodeExporter';
import { SceneLoad } from './nodes/SceneLoad';

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(
    Presets.classic.setup({
      area,
      customize: {
        node(context) {
          return CustomNode;
        },
        socket(context) {
          if (context.payload.name == execSocket.name) {
            return ExecSocket;
          }
          return Presets.classic.Socket;
        },
        control(data) {
          if (data.payload instanceof ComboBoxControl) {
            return ComboBoxControlImpl;
          }
          if (data.payload instanceof InputBoxControl) {
            return InputBoxControlImpl;
          }

          return Presets.classic.Control;
        },
      },
    }),
  );

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  await editor.addNode(new OnCollisionNode());
  await editor.addNode(new GotoSceneNode());
  await editor.addNode(new GotoSceneNode());
  await editor.addNode(new IfNode());
  await editor.addNode(new SceneLoad());

  editor.addPipe(context => {
    if (context.type === 'connectioncreate') {
      const { sourceOutput, targetInput } = context.data;
      const source = editor.getNode(context.data.source);
      const sourceSocket = source.outputs[sourceOutput]?.socket;
      const target = editor.getNode(context.data.target);
      const targetSocket = target.inputs[targetInput]?.socket;

      if (sourceSocket != targetSocket) return;
    }
    return context;
  });

  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    getCompiledJSON() {
      return JSON.stringify(getSceneJSON(editor.getNodes(), editor.getConnections()));
    },
    exportSceneState() {
      return { nodes: editor.getNodes(), connections: editor.getConnections() };
    },
    async clearEditor() {
      await editor.clear();
    },
    async importSceneState(
      nodes: ClassicPreset.Node[],
      connections: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>[],
    ) {
      for (let node of nodes) {
        await editor.addNode(node);
      }
      for (let connection of connections) {
        await editor.addConnection(connection);
      }
    },
    destroy: () => area.destroy(),
  };
}