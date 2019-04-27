import React, { useState } from 'react'
import { ReportMenu } from '<components>'
import styled from 'styled-components'
import { SwipeableDrawer, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core'
import { Home, Lock, LockOpen, Business, GroupWork, People, ShoppingCart, Assignment, ExpandLess, ExpandMore, Payment } from '@material-ui/icons'
import { Router } from '<routes>'
import { Auth } from '<services>'

const CollpaseIcon = collpase => {
  return collpase ? <ExpandLess /> : <ExpandMore />
}

const Menu = ({ name, icon, menuCollapse, openCollapse, ...rest }) => {
  return (
    <ListItem button {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText inset primary={name} />
      {menuCollapse ? CollpaseIcon(openCollapse) : null}
    </ListItem>
  )
}

export default ({ open, setOpened, auth, setPageName, ...rest }) => {
  const [report_opened, setReportOpened] = useState(false)

  const MenuFunction = page => {
    setOpened(false)
    if (page === 'login') Auth.login()
    else if (page === 'logout') Auth.logout()
    else Router.pushRoute(page)
  }

  const { isAuthenticated } = auth
  return (
    <SwipeableDrawer open={open} onClose={() => setOpened(false)} onOpen={() => setOpened(true)}>
      <Container>
        <Menu name="Home" icon={<Home />} onClick={() => MenuFunction('/')} />

        <Menu name="Org" icon={<Business />} onClick={() => MenuFunction('/org')} />
        <Menu name="Group" icon={<GroupWork />} onClick={() => MenuFunction('group')} />
        <Menu name="Seller" icon={<People />} onClick={() => MenuFunction('seller')} />
        <Menu name="Item" icon={<ShoppingCart />} onClick={() => MenuFunction('item')} />
        <Menu name="PO" icon={<Payment />} onClick={() => MenuFunction('po')} />
        <Menu menuCollapse openCollapse={report_opened} name="Report" icon={<Assignment />} onClick={() => setReportOpened(!report_opened)} />
        <ReportMenu open={report_opened} MenuFunction={MenuFunction} />
        <Divider />
        {!isAuthenticated ? (
          <Menu name="Login" icon={<Lock />} onClick={() => MenuFunction('login')} />
        ) : (
          <Menu name="Logout" icon={<LockOpen />} onClick={() => MenuFunction('logout')} />
        )}
      </Container>
    </SwipeableDrawer>
  )
}

const Container = styled.div`
  width: 200px;
`
