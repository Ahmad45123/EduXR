import * as React from "react";
import { ClassicPreset } from "rete";
import {
  ClassicScheme,
  RefComponent,
  RenderEmit
} from "rete-react-render-plugin";
import styled, { css } from "styled-components";

const $nodewidth = 200;
const $socketmargin = 6;
const $socketsize = 16;

type NodeExtraData = { width?: number; height?: number };

export const NodeStyles = styled.div<
  NodeExtraData & { selected: boolean; styles?: (props: any) => any }
>`
  background: black;
  border: 2px solid grey;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  width: ${(props) =>
    Number.isFinite(props.width) ? `${props.width}px` : `${$nodewidth}px`};
  height: ${(props) =>
    Number.isFinite(props.height) ? `${props.height}px` : "auto"};
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  &:hover {
    background: #333;
  }
  ${(props) =>
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
  .output-title,.control-title {
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
    padding: 5px;
  }
  ${(props) => props.styles && props.styles(props)}
`;

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData;
  styles?: () => any;
  emit: RenderEmit<S>;
};
export type NodeComponent<Scheme extends ClassicScheme> = (
  props: Props<Scheme>
) => JSX.Element;

export function CustomNode<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs);
  const outputs = Object.entries(props.data.outputs);
  const controls = Object.entries(props.data.controls);
  const selected = props.data.selected || false;
  const { id, label, width, height } = props.data;

  return (
    <NodeStyles
      selected={selected}
      width={width}
      height={height}
      styles={props.styles}
      data-testid="node"
    >
      <div className="title" data-testid="title">
        {label}
      </div>
      {/* Inputs */}
      {inputs.map(
        ([key, input]) =>
          input && (
            <div className={"input" + (input.socket.name !== "exec" ? " ml-2" : "")} key={key} data-testid={`input-${key}`}>
              <RefComponent
                className="input-socket"
                init={(ref) =>
                  props.emit({
                    type: "render",
                    data: {
                      type: "socket",
                      side: "input",
                      key: key,
                      nodeId: id,
                      element: ref,
                      payload: input.socket as any
                    }
                  })
                }
                data-testid="input-socket"
              />
              {input && (
                <div className="input-title" data-testid="input-title">
                  {input?.label}
                </div>
              )}
              {input?.control && input?.showControl && (
                <span className="input-control w-full ml-4">
                  <RefComponent
                    className="input-control"
                    key={key}
                    init={(ref) =>
                      input.control &&
                      props.emit({
                        type: "render",
                        data: {
                          type: "control",
                          element: ref,
                          payload: input.control as any
                        }
                      })
                    }
                    data-testid="input-control"
                  />
                </span>
              )}
            </div>
          )
      )}

      {/* Controls */}
      {controls.map(([key, control]) => {
        if (!control) return null;
        return (<div className="flex">
          <span className="control-title self-center" data-testid="control-title">
            {key}: 
          </span>
          <RefComponent
            className="control"
            key={key}
            init={(ref) =>
              props.emit({
                type: "render",
                data: {
                  type: "control",
                  element: ref,
                  payload: control as any
                }
              })
            }
            data-testid={`control-${key}`}
          />
        </div>);
      })}

      {/* Outputs */}
      {outputs.map(
        ([key, output]) =>
          output && (
            <div className={"output" + (output.socket.name !== "exec" ? " mr-2" : "")} key={key} data-testid={`output-${key}`}>
              <div className="output-title" data-testid="output-title">
                {output?.label}
              </div>
              <RefComponent
                className="output-socket"
                init={(ref) =>
                  props.emit({
                    type: "render",
                    data: {
                      type: "socket",
                      side: "output",
                      key: key,
                      nodeId: id,
                      element: ref,
                      payload: output.socket as any
                    }
                  })
                }
                data-testid="output-socket"
              />
            </div>
          )
      )}
    </NodeStyles>
  );
}
