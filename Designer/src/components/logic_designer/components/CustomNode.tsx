import { Box } from '@chakra-ui/react';
import { ClassicPreset } from 'rete';
import { ClassicScheme, RenderEmit } from 'rete-react-render-plugin';
import styled, { css } from 'styled-components';
import { RefControl } from '../refs/RefControl';
import { RefSocket } from '../refs/RefSocket';

const $nodewidth = 200;
const $socketmargin = 6;
const $socketsize = 16;
const $fontfamily =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'";

type NodeExtraData = {
  width?: number;
  height?: number;
  orderIndex?: { [key: string]: number };
};

export const NodeStyles = styled.div<
  NodeExtraData & { selected: boolean; styles?: (props: any) => any }
>`
  background: #191c46dd;
  border: 5px #cfc7ff solid;
  border-radius: 25px;
  transition: background 0.4s;
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
    font-family: ${$fontfamily};
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
    font-family: ${$fontfamily};
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
        <Box display="flex" width="100%">
          <RefControl
            key={key}
            name="control"
            emit={props.emit}
            payload={itm}
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
          <Box alignSelf={'center'}>
            <RefSocket
              name="input-socket"
              side="input"
              socketKey={key}
              nodeId={id}
              emit={props.emit}
              payload={itm.socket}
              data-testid="input-socket"
            />
          </Box>
          {!itm.control || !itm.showControl ? (
            <div className="input-title self-center" data-testid="input-title">
              {itm?.label}
            </div>
          ) : (
            <span className="input-control self-center w-72">
              <RefControl
                key={key}
                name="control"
                emit={props.emit}
                payload={itm.control}
                data-testid={`control-${key}`}
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
          <RefSocket
            name="output-socket"
            side="output"
            socketKey={key}
            nodeId={id}
            emit={props.emit}
            payload={itm.socket}
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
          <Box ml={'-0.5rem'} h="2.5rem">
            <RefSocket
              name="input-socket"
              side="input"
              socketKey={execInpt[0]}
              nodeId={id}
              emit={props.emit}
              payload={execInpt[1]?.socket as any}
              data-testid="input-socket"
            />
          </Box>
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
                  <RefSocket
                    name="output-socket"
                    side="output"
                    socketKey={key}
                    nodeId={id}
                    emit={props.emit}
                    payload={output.socket}
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
