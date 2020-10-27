import React, { useEffect, useState } from 'react';
import { Typography, Button, Row, Card, Col, Checkbox, Collapse } from 'antd';
import Axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import SearchFeature from '../../utils/SearchFeature';

const { Panel } = Collapse;

const { Meta } = Card;
 
const { Title } = Typography;

function AllProducts(props) {

    const [Products, setProducts] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [SearchTerms, setSearchTerms] = useState("");

    useEffect(() => {  

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)
        getCategories(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.get('/api/product/getProducts', variables )
        .then(response => {
            if(response.data.success) {
                if(variables.loadMore){
                    setProducts([...Products, ...response.data.products]);
                } else {
                    setProducts(response.data.products)
                }        
                setPostSize(response.data.postSize)
            } else {
                alert('Gabime ne marrjen e te dhenave');
            }
        })
    }

    const getCategories = (variables) => {
        Axios.get('/api/subCategories/getSubCategories', variables )
        .then(response => {
            if(response.status === 200) {
                setCategories(response.data);
            } else {
                alert('Gabime ne marrjen e te dhenave');
            }
        })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(variables)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        
        return <Col key={index} lg={6} md={8} xs={24}>
            <Card
                hoverable={true} 
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={product.description}
                    description={`${product.price} euro`}
                />
            </Card>
        </Col>
    })

    const filterCategory = Categories.map((category, index) => {
        
        return (
                <React.Fragment key={index}>
                    <Checkbox
                        type="checkbox"
                    >
                        <span>{category.name}</span>
                    </Checkbox>
                </React.Fragment>
        )
    })

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProducts(variables)
    }   

    return (
        <div style={{ maxWidth: '700px', margin: '30px auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={2}>Te gjitha produktet</Title>
            </div>
                <Button style={{ marginRight: '140px'}} href='/products'>SHTO PRODUKTE</Button> 
                <Button style={{ marginLeft: '70px'}} href='/categories'>SHTO KATEGORI</Button>
                <br/> <br/>
                <hr/>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px auto',}}>
                    <SearchFeature
                        refreshFunction={updateSearchTerms}
                    />
                </div>
                <br/>
                <Title level={3}>Zgjedh Kategorine</Title>
                <div>
                    <Collapse defaultActiveKey={['0']}>
                        <Panel headerkey="1">
                            {filterCategory}
                        </Panel>    
                    </Collapse>
                </div>
                <br/>
                {Products.length === 0 ? 
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>Nuk ka produkte te regjistruara</h2>
                    </div>
                    :
                    <div >
                        <Row gutter={[ 16, 16 ]}>
                            {renderCards}
                        </Row>
                    </div>
                }
                <br/> <br/>
                {PostSize >= Limit && 
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={onLoadMore}>Shiko me shume</Button>
                    </div>                    
                }
        </div>
    )
}

export default AllProducts