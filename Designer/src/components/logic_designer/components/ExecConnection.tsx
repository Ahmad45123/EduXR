import * as React from 'react';
import { css } from 'styled-components';
import { ClassicScheme, Presets } from 'rete-react-render-plugin';

const { Connection } = Presets.classic;

const styles = css`
  stroke: #00000045;
  stroke-dasharray: 10 5;
  animation: dash 1s linear infinite;
  stroke-dashoffset: 45;
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export function ExecConnectionComponent(props: {
  data: ClassicScheme['Connection'] & { isLoop?: boolean };
}) {
  return <Connection {...props} styles={() => styles} />;
}
