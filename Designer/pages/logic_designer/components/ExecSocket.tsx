import * as React from 'react'
import { ClassicPreset } from 'rete'
import styled from 'styled-components'

const $socketsize = 24
const $socketmargin = 6
const $socketcolor = '#FFA500'

const Styles = styled.div`
    display: inline-block;
    cursor: pointer;
    border: 1px solid white;
    border-radius: ${$socketsize/2.0}px;
    width: ${$socketsize}px;
    height: ${$socketsize}px;
    vertical-align: middle;
    background: ${$socketcolor};
    z-index: 2;
    box-sizing: border-box;
    &:hover {
      border-width: 4px;
    }
    &.multiple {
      border-color: yellow;
    }
    &.output { /// TODO remove?
      margin-right: - ${$socketsize / 2}px;
    }
    &.input { /// TODO remove?
      margin-left: - ${$socketsize / 2}px;
    }
`

const Hoverable = styled.div`
    border-radius: ${($socketsize + $socketmargin * 2)/2.0}px;
    padding: ${$socketmargin}px;
    &:hover ${Styles} {
      border-width: 4px;
    }
`

export function ExecSocket<T extends ClassicPreset.Socket>(props: { data: T }) {
  return (
    <Hoverable>
      <Styles title={props.data.name} />
    </Hoverable>
  )
}