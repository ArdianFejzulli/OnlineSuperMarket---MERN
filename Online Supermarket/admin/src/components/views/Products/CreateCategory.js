import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, Input, Table } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { Space } = Table;

function CreateCategory(props) {

  const [CategoryValue, setCategoryValue] = useState("");
  const [SubCategoryValue, setSubCategoryValue] = useState("");
  const [Categories, setCategories] = useState([]);

  
  useEffect(() => {  

    const variables = {
        categories: Categories
    }

    getCategories(variables)
}, [])    



  const onCategoryChange = (event) => {
    setCategoryValue(event.currentTarget.value)
  }

  const onSubCategoryChange = (event) => {
    setSubCategoryValue(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if( !CategoryValue ) {
        return alert('Kategoria e zbrazet!!!');
    }
    
    const variables = {
      writer: props.user.userData._id,
      category: CategoryValue,
      subcategory: SubCategoryValue,
  }

  // to save category in server
  Axios.post('/api/categories/uploadCategory', variables)
      .then(response => {
          if(response.data.success) {
              alert('Kategoria u shtua me sukses')
              props.history.push('/allproducts')
          } else {
              alert('Probleme teknike, kategoria nuk u shtua')
          }
      })
  }

  const getCategories = (variables) => {
    Axios.post('/api/categories/getCategories', variables )
    .then(response => {
        if(response.data.success) {
            setCategories(response.data.categories);

        } else {
            alert('Gabime ne marrjen e te dhenave');
        }
    })
}

const dataSource = Categories.map((category, index) => {
    return (
        <div key={index}>
            <span>{ category.category }</span>
        </div>
    )
})

const columns = [
    {
      title: 'Kategoria',
      key: 'category',
    },
    {
      title: 'Nen Kategoria',
      dataIndex: 'subcategory',
      key: 'subcategory',
    },
    {
      title: 'Menaxho Kategorite',
      dataIndex: 'manage',
      key: 'manage',
    },
  ];
  

return (
  <div style={{ maxWidth: '700px', margin: '30px auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2}>Shto Kategori</Title>
      </div>
      
      <Form>
          <Button style={{ marginRight: '130px'}} href='/allproducts'>TE GJITHA PRODUKTET</Button>
          <Button  style={{ marginLeft: '55px'}} href='/products'>SHTO PRODUKTE</Button> 
          <br /> <br />
          <hr />
          <label>Emri Kategorise</label>
          <Input 
              onChange={onCategoryChange}
              value={CategoryValue}
          />
          <br /> <br />
          <label>Nen Kategoria</label>
          <Input 
              onChange={onSubCategoryChange}
              value={SubCategoryValue}
          />
          <br /> <br />
          <div style={{ textAlign: 'center' }}>
          <Button onClick={onSubmit}>
              Shto Kategorine
          </Button>
          </div>
          <br/> 
          <hr/>
          <div style={{ width: '85%', margin: '40px auto' }} >
            <h1 style={{ textAlign: 'center' }}>Kategorite e regjistruara</h1> 
            <div>
                { <Table dataSource={dataSource} columns={columns} size="middle" /> }
            </div>
          </div>
      </Form>
  </div>
)
}

export default CreateCategory
