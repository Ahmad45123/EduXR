import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { ClassicPreset } from 'rete';
import { ClassicScheme, RefComponent, RenderEmit } from 'rete-react-render-plugin';
import styled, { css } from 'styled-components';

const $nodewidth = 200;
const $socketmargin = 6;
const $socketsize = 16;

type NodeExtraData = {
  width?: number;
  height?: number;
  orderIndex?: { [key: string]: number };
};

export const NodeStyles = styled.div<
  NodeExtraData & { selected: boolean; styles?: (props: any) => any }
>`
  background: #121212;
  border: 2px solid grey;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  width: ${props =>
    Number.isFinite(props.width) ? `${props.width}px` : `${$nodewidth}px`};
  height: ${props => (Number.isFinite(props.height) ? `${props.height}px` : 'auto')};
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  &:hover {
    background: #333;
  }
  ${props =>
    props.selected &&
    css`
      border-color: red;
    `}
  .title {
    color: white;
    font-family: sans-serif;
    font-size: 18px;
    padding: 8px;
  }
  .output {
    text-align: right;
  }
  .input {
    text-align: left;
  }
  .output-socket {
    text-align: right;
    margin-right: -1px;
    display: inline-block;
  }
  .input-socket {
    text-align: left;
    margin-left: -1px;
    display: inline-block;
  }
  .input-title,
  .output-title,
  .control-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: ${$socketmargin}px;
    line-height: ${$socketsize}px;
  }
  .input-control {
    z-index: 1;
    width: calc(100% - ${$socketsize + 2 * $socketmargin}px);
    vertical-align: middle;
    display: inline-block;
  }
  .control {
    display: block;
    padding: 10px;
    width: 100%;
  }

  .self-center {
    self-align: center;
  }

  .w-72 {
    width: 18rem;
  }

  .mr-2 {
    margin-right: 0.5rem;
  }

  .-ml-2 {
    margin-left: -0.5rem;
  }
  .ml-auto {
    margin-left: auto;
  }
  .-mr-2 {
    margin-right: -0.5rem;
  }
  .-mt-2 {
    margin-top: -0.5rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }

  .h-10 {
    height: 2.5rem;
  }
  ${props => props.styles && props.styles(props)}
`;

type Props<S extends ClassicScheme> = {
  data: S['Node'] & NodeExtraData;
  styles?: () => any;
  emit: RenderEmit<S>;
};
export type NodeComponent<Scheme extends ClassicScheme> = (
  props: Props<Scheme>,
) => JSX.Element;

type ControlOrInputOrOutput =
  | ClassicPreset.Control
  | ClassicPreset.Input<ClassicPreset.Socket>
  | ClassicPreset.Output<ClassicPreset.Socket>;

export function CustomNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  let inputs = Object.entries(props.data.inputs);
  let outputs = Object.entries(props.data.outputs);
  const selected = props.data.selected || false;
  const { id, label, width, height, orderIndex } = props.data;

  const everythingList: [string, ControlOrInputOrOutput | undefined][] = Object.entries(
    props.data.controls,
  );

  const execInpt = inputs.find(x => x[1]?.socket.name === 'exec');
  everythingList.push(...inputs.filter(x => x[1]?.socket.name !== 'exec'));

  const execOutputs = outputs.filter(x => x[1]?.socket.name === 'exec');
  everythingList.push(...outputs.filter(x => x[1]?.socket.name !== 'exec'));

  if (orderIndex) {
    everythingList.sort((a, b) => {
      return orderIndex[a[0]] - orderIndex[b[0]];
    });
  }

  function RenderItemm(key: string, itm: ControlOrInputOrOutput) {
    if (itm instanceof ClassicPreset.Control) {
      return (
        <Box display="flex" width="100%" my="0.75rem">
          <RefComponent
            className="control"
            key={key}
            init={ref =>
              props.emit({
                type: 'render',
                data: {
                  type: 'control',
                  element: ref,
                  payload: itm as any,
                },
              })
            }
            data-testid={`control-${key}`}
          />
        </Box>
      );
    }

    if (itm instanceof ClassicPreset.Input) {
      return (
        <Box
          ml="0.5rem"
          display="flex"
          className="input"
          key={key}
          data-testid={`input-${key}`}
        >
          <RefComponent
            className="input-socket self-center"
            init={ref =>
              props.emit({
                type: 'render',
                data: {
                  type: 'socket',
                  side: 'input',
                  key: key,
                  nodeId: id,
                  element: ref,
                  payload: itm.socket as any,
                },
              })
            }
            data-testid="input-socket"
          />
          {!itm.control || !itm.showControl ? (
            <div className="input-title self-center" data-testid="input-title">
              {itm?.label}
            </div>
          ) : (
            <span className="input-control self-center w-72">
              <RefComponent
                className="input-control"
                key={key}
                init={ref =>
                  itm.control &&
                  props.emit({
                    type: 'render',
                    data: {
                      type: 'control',
                      element: ref,
                      payload: itm.control as any,
                    },
                  })
                }
                data-testid="input-control"
              />
            </span>
          )}
        </Box>
      );
    }

    if (itm instanceof ClassicPreset.Output) {
      return (
        <div
          className={'output' + (itm.socket.name !== 'exec' ? ' mr-2' : '')}
          key={key}
          data-testid={`output-${key}`}
        >
          <div className="output-title" data-testid="output-title">
            {itm?.label}
          </div>
          <RefComponent
            className="output-socket"
            init={ref =>
              props.emit({
                type: 'render',
                data: {
                  type: 'socket',
                  side: 'output',
                  key: key,
                  nodeId: id,
                  element: ref,
                  payload: itm.socket as any,
                },
              })
            }
            data-testid="output-socket"
          />
        </div>
      );
    }
  }

  return (
    <NodeStyles
      selected={selected}
      width={width}
      height={height}
      styles={props.styles}
      data-testid="node"
    >
      <Box display="flex" className="title" data-testid="title">
        {execInpt && (
          <RefComponent
            className="input-socket -ml-2 h-10"
            init={ref =>
              props.emit({
                type: 'render',
                data: {
                  type: 'socket',
                  side: 'input',
                  key: execInpt[0],
                  nodeId: id,
                  element: ref,
                  payload: execInpt[1]?.socket as any,
                },
              })
            }
            data-testid="input-socket"
          />
        )}
        <span className="mt-2">{label}</span>
        <div className="ml-auto -mr-2 -mt-2">
          {execOutputs.map(
            ([key, output]) =>
              output && (
                <div
                  className={'output' + (output.socket.name !== 'exec' ? ' mr-2' : '')}
                  key={key}
                  data-testid={`output-${key}`}
                >
                  {output.label?.toLowerCase() !== 'exec' && (
                    <div className="output-title" data-testid="output-title">
                      {output?.label}
                    </div>
                  )}
                  <RefComponent
                    className="output-socket"
                    init={ref =>
                      props.emit({
                        type: 'render',
                        data: {
                          type: 'socket',
                          side: 'output',
                          key: key,
                          nodeId: id,
                          element: ref,
                          payload: output.socket as any,
                        },
                      })
                    }
                    data-testid="output-socket"
                  />
                </div>
              ),
          )}
        </div>
      </Box>

      {everythingList
        .filter(([key, obj]) => obj !== undefined)
        .map(([key, obj]) => RenderItemm(key, obj!))}
    </NodeStyles>
  );
}
