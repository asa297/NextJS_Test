import React from 'react'
import styled from 'styled-components'

import { List, AutoSizer } from 'react-virtualized'

class virtualized extends React.PureComponent {
  render() {
    return (
      <Container>
        <AutoSizer>{({ width, height }) => <List width={width} height={height} {...this.props} />}</AutoSizer>
      </Container>
    )
  }
}

export default virtualized

const Container = styled.div`
  @media (min-width: 600px) {
    height: calc(100vh - 64px - 100px);
  }
  height: calc(100vh - 56px - 100px);

  @media (min-width: 0px) and (max-width: 1200px) {
    width: 100%;
  }
  width: 80%;

  box-shadow: 2px 5px 10px rgba(220, 220, 220, 0.5);
`
