import styled from 'styled-components'
import { reportMenu } from './Menu'
import { Icon, Drawer, Menu } from 'antd'
import Router from 'next/router'

const SubMenu = Menu.SubMenu

const MenuItem = ({ name, type, ...rest }) => {
  return (
    <MenuItemWrapper {...rest}>
      {type && <MenuIcon type={type} />}
      <span> {name}</span>
    </MenuItemWrapper>
  )
}

export default ({ auth, ...rest }) => {
  const MenuFunction = page => {
    rest.onClose()
    // if (page === 'login') Auth.login()
    // else if (page === 'logout') Auth.logout()
    // else Router.push({ pathname: page })
  }

  console.log(auth)
  const { isAuthenticated } = auth
  return (
    <DrawerWrapper {...rest}>
      <MenuWrapper onClick={e => MenuFunction(e)} defaultSelectedKeys={['/home']} mode="inline">
        {!isAuthenticated ? <MenuItem name="Login" type="lock" /> : <MenuItem name="Logout" type="home" />}

        <MenuItem name="Home" key="/home" type="home" />
        <MenuItem name="Org" key="/org" type="build" />
        <MenuItem name="Group" key="/group" type="team" />
        <MenuItem name="Seller" key="/seller" type="user" />
        <MenuItem name="Item" key="/item" type="shop" />
        <MenuItem name="PO" key="/po" type="barcode" />
        <SubMenuItemWrapper
          key="sub1"
          title={
            <span>
              <MenuIcon type="pie-chart" />
              <span>Report</span>
            </span>
          }
        >
          {reportMenu.map(menu => (
            <MenuItem name={menu.name} key={menu.path} />
          ))}
        </SubMenuItemWrapper>
      </MenuWrapper>
    </DrawerWrapper>
  )
}

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }
`

const MenuWrapper = styled(Menu)`
  width: 100%;
`

const MenuItemWrapper = styled(Menu.Item)`
  display: flex;
  align-items: center;
  margin: 0px !important;
`

const SubMenuItemWrapper = styled(SubMenu)`
  max-height: 40px;
  .ant-menu-submenu-title {
    margin: 0px;
  }
`

const MenuIcon = styled(Icon)`
  font-size: 20px !important;
`
