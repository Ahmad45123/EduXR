import { NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { ContextMenuPlugin } from 'rete-context-menu-plugin';
import { Schemes, AreaExtra, BaseNode } from '../base_types';
import { Item } from 'rete-context-menu-plugin/_types/types';
import {
  CompareNode,
  EvalNode,
  GetPositionNode,
  GetRotationNode,
  GetScaleNode,
  GotoSceneNode,
  SceneLoadNode,
  SceneLoopNode,
  SetBouncinessNode,
  SetDynamicFrictionNode,
  SetMassNode,
  SetPositionNode,
  SetRotationNode,
  SetScaleNode,
  SetStaticFrictionNode,
  SetVisibleNode,
  ShowMessageNode,
} from '../nodes';

export const contextMenu = new ContextMenuPlugin<Schemes>({
  items: function (context, plugin) {
    const area = plugin.parentScope<AreaPlugin<Schemes, AreaExtra>>(AreaPlugin);
    const editor = area.parentScope<NodeEditor<Schemes>>(NodeEditor);

    function CreateItemFromNode(node: BaseNode) {
      return {
        label: node.label,
        key: node.label,
        handler: async () => {
          await editor.addNode(node);
          const pointer = area.area.pointer;
          area.nodeViews.get(node.id)?.translate(pointer.x, pointer.y);
        },
      };
    }

    if (context === 'root') {
      return {
        searchBar: true,
        list: [
          CreateItemFromNode(new SceneLoadNode()),
          CreateItemFromNode(new SceneLoopNode()),
          {
            label: 'Get Properties',
            key: 'getproperties',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new GetPositionNode()),
              CreateItemFromNode(new GetRotationNode()),
              CreateItemFromNode(new GetScaleNode()),
            ],
          },
          {
            label: 'Set Properties',
            key: 'setproperties',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new SetPositionNode()),
              CreateItemFromNode(new SetRotationNode()),
              CreateItemFromNode(new SetScaleNode()),
              CreateItemFromNode(new SetBouncinessNode()),
              CreateItemFromNode(new SetStaticFrictionNode()),
              CreateItemFromNode(new SetDynamicFrictionNode()),
              CreateItemFromNode(new SetMassNode()),
            ],
          },
          {
            label: 'UI',
            key: 'ui',
            handler: () => {},
            subitems: [CreateItemFromNode(new ShowMessageNode())],
          },
          {
            label: 'Flow Control',
            key: 'flowcontrol',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new GotoSceneNode()),
              CreateItemFromNode(new EvalNode()),
              CreateItemFromNode(new CompareNode()),
            ],
          },
          {
            label: 'Actions',
            key: 'actions',
            handler: () => {},
            subitems: [CreateItemFromNode(new SetVisibleNode())],
          },
        ],
      };
    }

    const deleteItem: Item = {
      label: 'Delete',
      key: 'delete',
      async handler() {
        const nodeId = context.id;
        const connections = editor
          .getConnections()
          .filter((c: { source: any; target: any }) => {
            return c.source === nodeId || c.target === nodeId;
          });

        for (const connection of connections) {
          await editor.removeConnection(connection.id);
        }
        await editor.removeNode(nodeId);
      },
    };

    return {
      searchBar: false,
      list: [deleteItem],
    };
  },
});
