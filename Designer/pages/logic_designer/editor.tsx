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

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

class OnCollisionNode extends ClassicPreset.Node {
  constructor() {
    super("OnCollision");

    this.addOutput("objName", new ClassicPreset.Output(stringSocket, "objName"));
    this.addOutput("exec", new ClassicPreset.Output(execSocket, "Exec"));
  }
}

class GotoSceneNode extends ClassicPreset.Node {
  constructor() {
    super("GotoScene");

    const sceneName = new ClassicPreset.Input(stringSocket, "sceneName");
    sceneName.addControl(new ClassicPreset.InputControl("text"));
    this.addInput("sceneName", sceneName);

    this.addInput("exec", new ClassicPreset.Input(execSocket, "Exec"));
  }
}

class IfNode extends ClassicPreset.Node {
  width = 250;
  orderIndex = {
    left: 0,
    condition: 1,
    right: 2,
  };

  constructor() {
    super('If');

    const left = new ClassicPreset.Input(stringSocket, 'Left');
    const right = new ClassicPreset.Input(stringSocket, 'Right');
    left.addControl(new ClassicPreset.InputControl('text'));
    right.addControl(new ClassicPreset.InputControl('text'));

    this.addInput('left', left);
    this.addControl('condition', new ClassicPreset.InputControl('text'));
    this.addInput('right', right);

    this.addInput('exec', new ClassicPreset.Input(execSocket, 'Exec'));
    this.addOutput('then', new ClassicPreset.Output(execSocket, 'Then'));
    this.addOutput('else', new ClassicPreset.Output(execSocket, 'Else'));
  }
}

export async function createEditor(container: HTMLElement) {

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactRenderPlugin<Schemes>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup({
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
    }
  }));

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

  editor.addPipe((context) => {
    if (context.type === 'connectioncreate') {
      const { sourceOutput, targetInput } = context.data
      const source = editor.getNode(context.data.source);
      const sourceSocket = source.outputs[sourceOutput]?.socket;
      const target = editor.getNode(context.data.target);
      const targetSocket = target.inputs[targetInput]?.socket;

      if (sourceSocket != targetSocket) return;
    }
    return context
  });

  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return () => area.destroy();
}
