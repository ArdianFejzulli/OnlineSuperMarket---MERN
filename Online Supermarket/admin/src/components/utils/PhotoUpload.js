import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function PhotoUpload(props) {

    const [Images, setImages] = useState([])
    
    const onDrop = (files) => {
        // props.refreshFunction(files[0]);
        console.log('files[0]', files[0])

        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        

        props.refreshFunction([files])
        // to save photos in server
        // Axios.post('/api/product/uploadImage', formData ,config)
        //   .then(response => {
        //       if(response.data.success) {

        //         setImages([...Images, response.data.image])
        //         props.refreshFunction([...Images, response.data.image])

        //       } else {
        //           alert('Probleme, fotoja nuk u ruajt');
        //       }
        //   })
    }

    const onDelete = (image) => {
        const currentIndex  = Images.indexOf(image);

        let newImages= [ ...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone 
            onDrop={onDrop}
            multiple={false}
            maxSize={80000000}
        >
            {({getRootProps, getInputProps}) => (
                <div style={{ width: '300px', height: '240px', border: '1px solid grey' 
                            , display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize: '50px' }} />
                </div>
            )}
        </Dropzone>
        
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

            {/* {Images.map((image, index) => (
                <div onClick={() => onDelete(image)} key={index}>
                    <img style={{ minWidth: '300px', width: '300px', height: '220px' }} 
                        src={`http://localhost:5000/${image}`} 
                        alt={`productImg-${index}`}/>
                </div>
            ))} */}

        </div>

    </div>
  )
}

export default PhotoUpload
