import React from 'react'
import styled from 'styled-components'
import { SwipeableDrawer, Divider } from '@material-ui/core'
import { Home, PermIdentity } from '@material-ui/icons'
import { Router } from '<routes>'

import sass from '<styles>/main.scss'

const Menu = ({ name, icon, ...rest }) => {
  return (
    <MenuContainer {...rest}>
      <IconContainer>
        {icon === 'home' ? <Home /> : null}
        {icon === 'login' ? <PermIdentity /> : null}
      </IconContainer>
      <MenuText>{name}</MenuText>
    </MenuContainer>
  )
}

export default ({ open, setOpened, ...rest }) => {
  const MenuFunction = page => {
    setOpened(false)

    // Router.pushRoute('/au/form')
  }

  return (
    <SwipeableDrawer open={open} onClose={() => setOpened(false)} onOpen={() => setOpened(true)}>
      <Container>
        <Menu name="Login" icon="login" onClick={() => MenuFunction('login')} />
        <Divider />
        <Menu name="Home" icon="home" onClick={() => MenuFunction('home')} />
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
