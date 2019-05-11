import React from 'react'
import styled from 'styled-components'

import { List, AutoSizer } from 'react-virtualized'

class virtualized extends React.PureComponent {
  render() {
    return (
      <Container>
        <AutoSizer>{({ width, height, isScrolling }) => <List width={width} height={height} isScrolling={isScrolling} {...this.props} />}</AutoSizer>
      </Container>
    )
  }
}

export default virtualized

const Container = styled.div`
  @media (max-width: 600px) {
    height: calc(100vh - 56px - 52px);
  }

  @media (min-width: 600px) and (max-width: 1366px) {
    height: calc(100vh - 64px - 52px);
  }
  height: calc(100vh - 64px - 100px);

  @media (min-width: 0px) and (max-width: 1366px) {
    width: 100%;
  }
  width: 60%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`
