import React from 'react'
import { Button } from '@material-ui/core'

class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <Button variant="outlined" color="secondary">
          Default
        </Button>
      </div>
    )
  }
}

Main.getInitialProps = async ctx => {
  return {}
}

export default Main
