import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Dashboard</a>
    </Menu.Item>
    <SubMenu title={<span>SuperMarket</span>}>
        <Menu.Item key="setting:1">Shiko Marketin</Menu.Item>
        <Menu.Item key="setting:2"><a href= "/adminprofile">Profili juaj</a> </Menu.Item>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu