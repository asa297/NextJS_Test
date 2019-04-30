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
  width: 80%;
  @media (min-width: 600px) {
    height: calc(100vh - 64px - 100px);
  }
  height: calc(100vh - 56px - 100px);

  box-shadow: 2px 5px 10px rgba(220, 220, 220, 0.5);
`
