import styled from 'styled-components'
import { reportMenu, mainMenu } from './Menu'
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

    // console.log(page)
    if (key === '/login') Auth.login()
    else if (key === '/logout') Auth.logout()
    // else Router.push({ pathname: page })
    // if (page === 'login') Auth.login()
    // else if (page === 'logout') Auth.logout()
    // else Router.push({ pathname: page })
  }

  const renderMainMenu = () => mainMenu.map(menu => <MenuItem name={menu.name} key={menu.path} type={menu.type} />)
  console.log(auth)
  const { isAuthenticated } = auth
  return (
    <DrawerWrapper {...rest}>
      <MenuWrapper onClick={e => MenuFunction(e)} defaultSelectedKeys={['/home']} mode="inline">
        <MenuItem name="Home" key="/home" type="home" />

        {!isAuthenticated ? <MenuItem name="Login" key="/login" type="lock" /> : <MenuItem name="Logout" key="/logout" type="unlock" />}
        {isAuthenticated && renderMainMenu()}
        {isAuthenticated && (
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
        )}
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
