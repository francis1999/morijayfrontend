import React from 'react';
import passport from "../images/passport.jpeg";
import bell from "../images/bell.svg"
import envelope from "../images/envelope.svg";
import logow from "../images/morijaylogo.png";
import { Link } from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../Session/userSession';
import { getUser } from '../Session/userSession';
import { multipleFilesUpload } from './data/api';
const getToken = localStorage.getItem("token");


const Addproduct = () => {
    const data=getUser()
const [multipleFiles, setMultipleFiles]=useState('')
const user=getUser() 
const userid=user._id;
const navigate = useNavigate();


const sendProduct = {
    description: "",
    brand: "",
    model: "",
    user_id:user._id,
    condition: "",
    price: "",
    image: ""
};
const [products, setProducts]=useState(sendProduct)
const multipleFilesChange=(e)=>{
    e.preventDefault();
    setMultipleFiles(e.target.files)
}
const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setProducts({ ...products, [name]: value })
}

const uploadMultipleFiles= async(e)=>{
    e.preventDefault();
    const formData=new FormData();
     for(let i=0; i<multipleFiles.length; i++){
        formData.append('image',multipleFiles[i])
    } 
    formData.append("image", products.image);
    formData.append('model',products.model)
    formData.append('description',products.description)
    formData.append('user_id',products.user_id)
    formData.append('status',products.status)
    formData.append('condition',products.condition)
    formData.append('category',products.category)
    formData.append('price',products.price)
   await multipleFilesUpload(formData);
   console.log(formData);
}

/****************Add Car Code End **************/

/**************** Logout Code Start**************/
    const handleLogout = async () => {
    await axios.post(`user/Logout`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getToken}`
        },
    }).then(function (response) {
        console.log(response);
        if (response.data.message == "Logout") {
            new Swal("You Have Successfully Logged Out!!!");
            removeUserSession("data", "token");
            navigate('/');

        } else {
            alert("Error Logout");
        }
    })

};
/**************** Logout Code End**************/
    return (
        <div>
           <div className='dashboard-header justify-content-between d-flex p-2'>
            <div className=''>
                <div className='dashboard-logo'><img src={logow} alt="logo"/></div>
            </div>
            <div className='right-nav justify-content-between d-flex'>
            <div className='ml text-white' style={{color:"white",margin:"10px"}}>
                {data.fullname} 
            </div>
            {/* <div className='notifications'>
                    <div className='ml'><img src={envelope} alt="Message Bell" /></div>
                    <div className='ml'><img src={bell} alt="notification Bell" /></div>
                    <div className='ml'><img src={passport} alt="profile Picture" /></div>
            </div> */}
                    
            </div>
        </div>
            <div className='d-flex justify-content-between'>
            <div className='right-div'>
                    <div><Link to="/dashboard/home">DASHBOARD</Link></div>
                    <div><Link to="/dashboard/addcar">Add Category</Link></div>
                    <div><Link to="/dashboard/allcars">View Product</Link></div>
                    <div><Link to="/dashboard/addproduct">Add Product</Link></div>
                    <div><Link to="/dashboard/logout" /* onClick={handleLogout} */>Logout</Link></div>
                </div>

                <div className='left-div p-4'>

                    <div className='headings'>Add New Product</div>
                        <Form encType="multipart/form-data">
                            {/* <Form.Group className="">
                                <Form.Label>Brand</Form.Label>
                                <Form.Select name="brand" onChange={handleInputChange}>
                                <option>---Select Brand---</option>
                                <option>Mazda</option>
                                <option>Peugoet</option>
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="productname" placeholder="Product Name" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" name="model" placeholder="model" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" placeholder="description" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Condition</Form.Label>
                                <Form.Control type="text" name="condition" placeholder="condition" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" placeholder="price" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" name="status" placeholder="status (Available)" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" name="category" placeholder="category" onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Uploads</Form.Label>
                                <Form.Control type="file" name="image" onChange={multipleFilesChange} multiple/>
                            </Form.Group>
                           

                            <Button variant="primary" type="submit" onClick={uploadMultipleFiles}>
                                Add
                            </Button>
                        </Form>
                </div>
                
            </div>
        </div>
    );
}

export default Addproduct;
