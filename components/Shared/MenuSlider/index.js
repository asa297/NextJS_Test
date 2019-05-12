import styled from 'styled-components'
import { reportMenu, mainMenu } from './menuContent'
import { Icon, Drawer, Menu } from 'antd'
import { Auth } from '<services>'
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
    const { key } = page
    rest.onClose()
    if (key === '/login') Auth.login()
    else if (key === '/logout') Auth.logout()
    else Router.push({ pathname: key })
  }

  const renderMainMenu = () => mainMenu.map(menu => <MenuItem name={menu.name} key={menu.path} type={menu.type} />)
  const { isAuthenticated } = auth
  return (
    <DrawerWrapper {...rest}>
      <MenuWrapper onClick={e => MenuFunction(e)} mode="inline">
        <MenuItem name="Home" key="/" type="home" />

        {isAuthenticated && renderMainMenu()}
        {isAuthenticated && (
          <SubMenu
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
          </SubMenu>
        )}

        {!isAuthenticated ? <MenuItem name="Login" key="/login" type="lock" /> : <MenuItem name="Logout" key="/logout" type="unlock" />}
      </MenuWrapper>
    </DrawerWrapper>
  )
}

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }

  z-index: 20;
`

const MenuWrapper = styled(Menu)`
  width: 100%;
`

const MenuItemWrapper = styled(Menu.Item)`
  display: flex;
  align-items: center;
`

const MenuIcon = styled(Icon)`
  font-size: 20px !important;
`
