import * as React from 'react';
import { css } from 'styled-components';
import { ClassicScheme, Presets } from 'rete-react-render-plugin';

const { Connection } = Presets.classic;

const styles = css`
  stroke: #b30000b8;
`;

export function DataConnectionComponent(props: {
  data: ClassicScheme['Connection'] & { isLoop?: boolean };
}) {
  return <Connection {...props} styles={() => styles} />;
}
