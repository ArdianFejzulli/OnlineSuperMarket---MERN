import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Typography, Button, Descriptions } from 'antd';

const { Title } = Typography;

const Profile = () => {

     const userId = window.localStorage.getItem('userId');
     const [User, setUser] = useState([]);

     useEffect(() => {
      Axios.get(`/api/users/getUserById/${userId}`)
          .then(response => {
              setUser(response.data);
          })
  }, [])
    
  return (
    <div style={{ maxWidth: '700px', margin: '30px auto'}}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2}>Profili juaj</Title>
        </div>
        <div>
        <Descriptions title="Te dhenat e juaja">
            <Descriptions.Item label="Emri dhe Mbiemri"> {User.name} </Descriptions.Item>
            <Descriptions.Item label="Email"> {User.email} </Descriptions.Item>
            <Descriptions.Item label="Numri telefonit"> {User.phone} </Descriptions.Item>
        </Descriptions>
       </div>
    </div>
  )
}

export default Profile;