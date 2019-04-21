import React from 'react'
import styled from 'styled-components'
import { SwipeableDrawer, Divider } from '@material-ui/core'
import { Home, Lock, LockOpen } from '@material-ui/icons'
import { Router } from '<routes>'
import { Auth } from '<services>'

import sass from '<styles>/main.scss'

const Menu = ({ name, icon, ...rest }) => {
  return (
    <MenuContainer {...rest}>
      <IconContainer>
        {icon === 'home' ? <Home /> : null}
        {icon === 'login' ? <Lock /> : null}
        {icon === 'logout' ? <LockOpen /> : null}
      </IconContainer>
      <MenuText>{name}</MenuText>
    </MenuContainer>
  )
}

export default ({ open, setOpened, ...rest }) => {
  const MenuFunction = page => {
    setOpened(false)
    if (page === 'login') Auth.login()
    else if (page === 'logout') Auth.logout()
    // Router.pushRoute('/au/form')
  }

  const isAuthenticated = Auth.isAuthenticated()
  return (
    <SwipeableDrawer open={open} onClose={() => setOpened(false)} onOpen={() => setOpened(true)}>
      <Container>
        <Menu name="Home" icon="home" onClick={() => MenuFunction('home')} />
        {!isAuthenticated ? (
          <Menu name="Login" icon="login" onClick={() => MenuFunction('login')} />
        ) : (
          <Menu name="Logout" icon="logout" onClick={() => MenuFunction('logout')} />
        )}
      </Container>
    </SwipeableDrawer>
  )
}

const Container = styled.div`
  width: 200px;
`
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  :hover {
    background-color: ${sass.menu_hover};
  }
`
const IconContainer = styled.div`
  padding-right: 2px;
`
const MenuText = styled.label`
  font-size: 14px;
`
