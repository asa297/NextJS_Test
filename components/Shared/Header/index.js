import { useState } from 'react'
import { Icon, Tooltip } from 'antd'
import styled from 'styled-components'
import { MenuSlider } from '<components>'

export default ({ page, auth, pageName, ...rest }) => {
  const [visible, setVisible] = useState(false)
  const titleDrawer = `Hi, ${auth.user ? auth.user.nickname : 'Guest'}`
  return (
    <>
      <HeaderContainer>
        <MainContainer>
          <MenuContainer onClick={() => setVisible(true)}>
            <IconWhite type="bars" />
          </MenuContainer>

          <LabelPage>{pageName}</LabelPage>
        </MainContainer>

        <UserNameContainer>
          <Tooltip placement="leftTop" title={auth.user ? auth.user.nickname : 'Guest'}>
            <UserNameLabel>{auth.user ? auth.user.nickname : 'Guest'}</UserNameLabel>
          </Tooltip>
        </UserNameContainer>
      </HeaderContainer>
      <MenuSlider visible={visible} onClose={() => setVisible(!visible)} closable={false} placement={'left'} title={titleDrawer} auth={auth} />
    </>
  )
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  @media (min-width: 600px) {
    height: 64px;
  }
  height: 56px;
  background-color: #2196f3;

  display: flex;
  align-items: center;
  z-index: 9999;
`
const MenuContainer = styled.div`
  width: 50px;
  height: 100%;
  padding: 10px;
  font-size: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;
`
const IconWhite = styled(Icon)`
  color: white;
  cursor: pointer;
  :hover,
  :focus {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
`

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
  padding-right: 20px;
`

const UserNameLabel = styled.label`
  font-size: 14px;
  color: white;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const LabelPage = styled.label`
  font-size: 20px;
  color: white;
  font-weight: 100;
`
