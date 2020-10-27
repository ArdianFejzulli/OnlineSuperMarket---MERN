import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Checkbox, Collapse, Select, } from 'antd';
import PhotoUpload from '../../utils/PhotoUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const Discounts = [
    { key: 1, value: 5},
    { key: 2, value: 10},
    { key: 3, value: 15},
    { key: 4, value: 20},
    { key: 5, value: 25},
    { key: 6, value: 30},
    { key: 7, value: 35},
    { key: 8, value: 40},
    { key: 9, value: 45},
    { key: 10, value: 50},
]

function UploadProduct(props) {

    const [NameValue, setNameValue] = useState();
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [DiscountValue, setDiscountValue] = useState(1);
    const [Images, setImages] = useState([]);
    const [Categories, setCategories] = useState([]);

    const [Product, setProduct] = useState([]);
    const productId = props.match.params.productId

    useEffect(() => {
        Axios.get(`/api/product/getProductById/${productId}`)
            .then(response => {
                setProduct(response.data);
                setNameValue(response.data.title);
                setDescriptionValue(response.data.description);
                setPriceValue(response.data.price);
                setCategories(response.data.categories);
            })
    }, [])
    
    useEffect(() => {  

        const variables = {
            categories: Categories
        }

        getCategories(variables)
    }, [])    


    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages)
    }

    const onDiscountsChange = (event) => {
        setDiscountValue(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if( !NameValue || !DescriptionValue || !PriceValue || !Images || !Categories) {
            return alert('Mbushni te gjitha fushat e kerkuara!');
        } 

        const variables = {
            writer: props.user.userData._id,
            title: NameValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            discount: DiscountValue,
        }

        // to save product in server
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if(response.data.success) {
                    alert('Produkti u shtua me sukses')
                    props.history.push('/allproducts')
                } else {
                    alert('Probleme teknike, produkti nuk u shtua')
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

    const onSubmitUpload = () => {
        Axios.patch(`/api/product/updateProduct/${productId}`, {
            title: NameValue,
            description: DescriptionValue,
            price: PriceValue,
        })
        .then(response => {
            if(response.status === 200) {
                alert("Produkti u perditsua me sukses");
                props.history.push('/allproducts');
            } else {
                alert("Produkti nuk u perditesua!");
            }
          })
    }

    const filterCategory = Categories && Categories.map((category, index) => {
        
        return (
                <React.Fragment key={index}>
                    <Checkbox
                        type="checkbox"
                    >
                        <span>{category.category}</span>
                    </Checkbox>
                </React.Fragment>
        )
    })

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto'}}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2}>Shto Produkte</Title>
        </div>
        
        <Form onSubmit={onSubmit}>
            <Button style={{ marginRight: '125px' }} href='/allproducts'>TE GJITHA PRODUKTET</Button> 
            <Button  style={{ marginLeft: '50px'}} href='/categories'>SHTO KATEGORI</Button>
            <br/> <br/>
            <hr/>
            <br/>
            <PhotoUpload refreshFunction={updateImages}/>
            <br/> <br/>
            <label>Emri Produktit</label>
            <Input 
                onChange={onNameChange}
                value={NameValue}
            />
            <br/> <br />
            <label>Pershkrimi Produktit</label>
            <TextArea 
                onChange={onDescriptionChange}
                value={DescriptionValue}
            />
            <br/> <br/>
            <label>Cmimi Produktit(euro)</label>
            <Input 
                onChange={onPriceChange}
                value={PriceValue}
                type="number"
            />
            <br/> <br/>
            <Title level={3}>Zgjedh Kategorine</Title>
                <Collapse 
                defaultActiveKey={['0']} 
                onChange={onCategoryChange}
                value={Categories} 
                >
                    <Panel headerkey="1">
                        {filterCategory}
                    </Panel>    
                </Collapse>
            <br/>
            <label>Shto Zbritje </label>
            <br/> 
            { <Select onClick={onDiscountsChange}>
                {Discounts.map(item => (
                    <Option key={item.key} value={item.key}> {item.value}% </Option>
                ))}
            </Select> }
            <br/> <br/>
            <div style={{ textAlign: 'center' }}>
                <Button onClick={onSubmitUpload}>
                    Perditso Produktin
                </Button>
            </div>
        </Form>
    </div>
  )
}

export default UploadProduct