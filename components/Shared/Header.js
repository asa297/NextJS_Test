import React, { useState } from 'react'
import { LeftSider } from '<components>'
import { AppBar, Toolbar, IconButton, Tooltip, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import styled from 'styled-components'

export default ({ page, auth, pageName, ...rest }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MainContainer>
            <IconButton color="inherit" aria-label="Menu" onClick={() => setOpened(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {pageName}
            </Typography>
          </MainContainer>

          <UserNameContainer>
            <Tooltip title={auth.user ? auth.user.name : 'Guest'} placement="left">
              <UserNameLabel>{auth.user ? auth.user.name : 'Guest'}</UserNameLabel>
            </Tooltip>
          </UserNameContainer>
        </Toolbar>
      </AppBar>
      <LeftSider open={opened} setOpened={open => setOpened(open)} auth={auth} />
    </>
  )
}
const MainContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`

const UserNameContainer = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 600px) {
    display: none;
  }
`
const UserNameLabel = styled.label`
  font-size: 14px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
