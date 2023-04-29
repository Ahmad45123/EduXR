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
import {
  ExportedNode,
  ExportedNodes,
  getSceneJSON,
  importIntoEditor,
} from './node_exporter';
import { SceneLoadNode } from './nodes/SceneLoadNode';
import { DockPlugin, DockPresets } from 'rete-dock-plugin';
import { AskQuestionNode } from './nodes/ui/AskQuestionNode';
import { ShowMessageNode } from './nodes/ui/ShowMessageNode';
import { Schemes, AreaExtra } from './base_types';
import { debounce } from 'debounce';

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes>({ createRoot });
  const dock = new DockPlugin<Schemes>();

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
  dock.addPreset(DockPresets.classic.setup({ area, size: 100, scale: 0.6 }));

  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(dock);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  dock.add(() => new OnCollisionNode());
  dock.add(() => new GotoSceneNode());
  dock.add(() => new SceneLoadNode());
  dock.add(() => new AskQuestionNode());
  dock.add(() => new ShowMessageNode());

  let onChangeCallback: (nodes: ExportedNodes) => void;

  area.addPipe(context => {
    if (context.type === 'connectioncreate') {
      const { sourceOutput, targetInput } = context.data;
      const source = editor.getNode(context.data.source);
      const sourceSocket = source.outputs[sourceOutput]?.socket;
      const target = editor.getNode(context.data.target);
      const targetSocket = target.inputs[targetInput]?.socket;

      if (sourceSocket != targetSocket) return;
    }

    if (
      onChangeCallback &&
      (context.type == 'connectioncreated' ||
        context.type == 'connectionremoved' ||
        context.type == 'nodecreated' ||
        context.type == 'noderemoved' ||
        context.type == 'nodetranslated')
    ) {
      onChangeCallback(
        getSceneJSON(editor.getNodes(), editor.getConnections(), area.nodeViews),
      );
    }

    return context;
  });

  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    onSceneStateChange(callback: (nodes: ExportedNodes) => void) {
      onChangeCallback = debounce(callback, 500);
    },
    async importSceneState(nodes: ExportedNodes) {
      await editor.clear();
      await importIntoEditor(editor, area, nodes);
    },
    destroy: () => area.destroy(),
  };
}
