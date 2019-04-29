import React from 'react'
import styled from 'styled-components'
import { List, AutoSizer } from 'react-virtualized'

class virtualized extends React.PureComponent {
  state = {
    data: [],
  }

  componentWillMount() {
    for (let i = 0; i < 1000; i++) {
      let { data } = this.state
      const result = { id: i, username: `username${i}` }
      data.push(result)
      this.setState({ data })
    }
  }
  renderRow({ index, key, style }) {
    const { data } = this.state
    return (
      <div key={key} style={style}>
        {data[index].username}
      </div>
    )
  }

  render() {
    const { data } = this.state

    return (
      <Container>
        <AutoSizer>
          {({ width, height }) => (
            <List width={width} height={height} rowHeight={50} rowRenderer={rowRenderer => this.renderRow(rowRenderer)} rowCount={data.length} />
          )}
        </AutoSizer>
      </Container>
    )
  }
}

export default virtualized

const Container = styled.div`
  @media (min-width: 600px) {
    height: calc(100vh - 64px);
  }
  height: calc(100vh - 56px);
`
const ListView = styled.div`
  cursor: pointer;
`
