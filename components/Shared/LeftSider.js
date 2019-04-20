import React from 'react'
import { SwipeableDrawer } from '@material-ui/core'

export default ({ open, setOpened, ...rest }) => {
  return (
    <SwipeableDrawer open={open} onClose={() => setOpened(false)} onOpen={() => setOpened(true)}>
      <div>test</div>
    </SwipeableDrawer>
  )
}
