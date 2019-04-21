import React, { useState } from 'react'
import { LeftSider } from '<components>'
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import styled from 'styled-components'

export default ({ page, auth }) => {
  const [opened, setOpened] = useState(false)
  // console.log(auth)
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MainContainer>
            <IconButton color="inherit" aria-label="Menu" onClick={() => setOpened(true)}>
              <Menu />
            </IconButton>
          </MainContainer>

          <UserNameContainer>
            <Tooltip title="Photosdasdaddaddaddads" placement="left">
              <UserNameLabel>Photosdasdaddaddaddads</UserNameLabel>
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
