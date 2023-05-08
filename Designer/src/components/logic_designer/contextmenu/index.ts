import { NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { ContextMenuPlugin } from 'rete-context-menu-plugin';
import { Schemes, AreaExtra, BaseNode } from '../base_types';
import { Item } from 'rete-context-menu-plugin/_types/types';
import {
  ApplyForceOnObjectNode,
  CompareNode,
  EvalNode,
  EvalStringNode,
  GetTimeSinceLastLoopNode,
  GetElapsedTimeNode,
  GetPositionNode,
  GetRotationNode,
  GetScaleNode,
  GetSpeedNode,
  GetVariableNode,
  GotoSceneNode,
  SceneLoadNode,
  SceneLoopNode,
  SetBouncinessNode,
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
  SetColorNode,
  GetDistanceBetweenNode,
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
          CreateItemFromNode(new GotoSceneNode()),
          {
            label: 'Get Properties',
            key: 'getproperties',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new GetPositionNode()),
              CreateItemFromNode(new GetRotationNode()),
              CreateItemFromNode(new GetScaleNode()),
              CreateItemFromNode(new GetSpeedNode()),
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
              CreateItemFromNode(new SetColorNode()),
            ],
          },
          {
            label: 'UI',
            key: 'ui',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new ShowMessageNode()),
              CreateItemFromNode(new SetObjectDescriptionNode()),
            ],
          },
          {
            label: 'Flow Control',
            key: 'flowcontrol',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new EvalNode()),
              CreateItemFromNode(new EvalStringNode()),
              CreateItemFromNode(new CompareNode()),
              CreateItemFromNode(new GetElapsedTimeNode()),
              CreateItemFromNode(new GetTimeSinceLastLoopNode()),
              CreateItemFromNode(new GotoSceneNode()),
            ],
          },
          {
            label: 'Actions',
            key: 'actions',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new SetVisibleNode()),
              CreateItemFromNode(new ApplyForceOnObjectNode()),
            ],
          },
          {
            label: 'Variables',
            key: 'variables',
            handler: () => {},
            subitems: [
              CreateItemFromNode(new GetVariableNode()),
              CreateItemFromNode(new SetVariableNode()),
            ],
          },
          {
            label: 'Msic',
            key: 'misc',
            handler: () => {},
            subitems: [CreateItemFromNode(new GetDistanceBetweenNode())],
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
