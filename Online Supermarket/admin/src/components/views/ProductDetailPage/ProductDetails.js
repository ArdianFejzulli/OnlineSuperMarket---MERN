import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function ProductDetails(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`/api/product/getProductById/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
    }, [])

    
    const onDelete = (productId) =>{
      console.log('productId', productId)
      Axios.delete(`/api/product/deleteProduct/${productId}`,)
        .then(response => {
          if(response.status === 200) {
            alert('Produkti eshte fshire me sukses!');
            props.history.push('/allproducts');
          } else {
            alert('Produkti nuk eshte fshire!');
          }
        })
    }

  return (
    <div className="postPage" style={{ width: '100%', padding: '48px 64px' }}>

      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <h1>{Product.title}</h1>
      </div>
      <br />
    
      <Row gutter={[ 16,16 ]} >
        <Col  lg={12} xs={24} >
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo 
              detail={Product}
              deleteProduct={onDelete}              
          />
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetails
