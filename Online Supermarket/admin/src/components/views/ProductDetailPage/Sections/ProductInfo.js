import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd'

function ProductInfo(props) {

    const [Product, setProduct] = useState({});

    useEffect(() => {
        
        setProduct(props.detail)

    }, [props.detail])


  return (
    <div>
        <Descriptions title="Detajet e Produktit">
            <Descriptions.Item label="Cmimi"> {Product.price} </Descriptions.Item>
            <Descriptions.Item label="Shitjet"> {Product.sold} </Descriptions.Item>
            <Descriptions.Item label="Zbritja"> {Product.discount} </Descriptions.Item>
            <Descriptions.Item label="Pershkrimi"> {Product.description} </Descriptions.Item>
        </Descriptions>
            <br/> <br/>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="primary" shape="round" href={`/uploadProduct/${Product._id}`}>
                    Edito Produktin
                </Button>
                <Button onClick={() => props.deleteProduct(Product._id)} type="danger" shape="round">
                    Fshije Produktin
                </Button>
            </div>
            <br/> <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}> 
                <Button 
                    size="large" 
                    shape="round" 
                    href='/allproducts'
                >
                    Kthehu tek te gjitha produktet
                </Button>
            </div>
    </div>
  )
}

export default ProductInfo
