import React, { useState } from 'react'
import { LeftSider } from '<components>'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export default ({ page }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={() => setOpened(true)}>
            <Menu />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <LeftSider open={opened} setOpened={open => setOpened(open)} />
    </>
  )
}
