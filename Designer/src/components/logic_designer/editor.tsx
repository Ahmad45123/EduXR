import { debounce } from 'debounce';
import { createRoot } from 'react-dom/client';
import { NodeEditor } from 'rete';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';

import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import {
  ContextMenuPlugin,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';
import { Presets, ReactRenderPlugin } from 'rete-react-render-plugin';
import { AreaExtra, Schemes } from './base_types';
import { CustomNode } from './components/CustomNode';
import { ExecSocket } from './components/ExecSocket';
import { ComboBoxControl, ComboBoxControlImpl } from './controls/ComboBoxControl';
import { InputBoxControl, InputBoxControlImpl } from './controls/InputBoxControl';
import { GotoSceneNode } from './nodes/GotoSceneNode';
import { IfNode } from './nodes/IfNode';
import { OnCollisionNode } from './nodes/OnCollisionNode';
import { SceneLoadNode } from './nodes/SceneLoadNode';
import { SceneLoopNode } from './nodes/SceneLoopNode';
import { ExportedNodes, getSceneJSON, importIntoEditor } from './node_exporter';
import { execSocket } from './sockets';

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes>({ createRoot });
  const contextMenu = new ContextMenuPlugin<Schemes, AreaExtra>({
    items: ContextMenuPresets.classic.setup([
      ['SceneLoad', () => new SceneLoadNode()],
      ['SceneLoop', () => new SceneLoopNode()],
      ['If', () => new IfNode()],
      ['OnCollision', () => new OnCollisionNode()],
      ['GotoScene', () => new GotoSceneNode()],
    ]),
  });

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
  render.addPreset(Presets.contextMenu.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(contextMenu);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

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
