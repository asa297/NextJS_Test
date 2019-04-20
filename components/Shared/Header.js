import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export default props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
