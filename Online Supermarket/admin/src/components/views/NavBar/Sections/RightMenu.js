import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout/${window.localStorage.getItem('userId')}`).then(response => {
      if (response.status === 200) {
        localStorage.removeItem('rememberMe');
        window.sessionStorage.removeItem('loggedIn');
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (window.localStorage.getItem('rememberMe') || window.sessionStorage.getItem('loggedIn')) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <a href="/products">Menaxho produktet</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Dil</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Kycu</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Regjistrohu</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

