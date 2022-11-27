import React from 'react';
import './HomeContent.css';
import './singlepage.css';
import CardItem from './CardItem';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
//import passport from "../images/passport.jpeg"
//import bell from "../images/bell.svg"
//import envelope from "../images/envelope.svg"
//import logow from "../images/logow.png"
//import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
//import Header from '../includes/header';

const Singlepage = () => {
    const [loading, setLoading]=useState(true)
    const [cars, setCars]=useState()
    const { _id } = useParams();


    useEffect(()=>{
        let mounted=true
        axios.get(`https://morijaybackend.herokuapp.com/api/product/singleproduct/${_id}`).then((res)=>{
            if(mounted){
                if(res.data.message=="success"){
                    setCars(res.data.data)
                    setLoading(false)
                    console.log(cars)
                }
                else if(res.data.status==="500"){
                    new Swal("Warning", res.data.message,"error")
                }
            }
        })
       return()=>{
        mounted=false
       }
    })

    

    if(loading){
        return(
            <h3>Loading...</h3>
        )
    }
    else
    {
       
     
    }


    return (
        <div>
            <div className='container-fluid' id="containers">
                <div className='left-image'>
                    <img src={cars.image} alt="" className='product-image'/>
                </div>
                <div>
                    <div className='details-div'>
                        <h2>{cars.productname} - {cars.status} </h2>
                        <p><h3>Description:</h3>{cars.description}</p>
                        <p><h3>Model Name:</h3>{cars.modelname}</p>
                        <p><h3>Price:</h3>&#8358;{cars.price}</p>
                        <div className='seller-button'>Contact Seller</div>
                    </div>
                </div>
            </div>
            
            {/* <div className=''>
                <div className=''>
                    <div className=''>
                            <div className=''>
                                <div className=''>
                                    <div className="">
                                            <div className="">
                                            <div className="">
                                        <img src={cars.image} alt="" className=''/>
                                            </div>
                                            </div>
                                        </div>
                                    <div className="">
                                            <div className="">
                                            <div className="">
                                        <img src={cars.image} alt="" className=''/>
                                            <div className="">&#8358; {cars.price}.</div>
                                                <div className="" >{cars.modelname}-{cars.year}</div>
                                                <div className="">{cars.description}.</div>
                                                <a href="#" className=""> Add to Cart</a>
                                            </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className=''>
                            <div className=''>
                                <div className=''>
                                    <div className="">
                                            <div className="">
                                            <div className="">
                                        <img src={cars.image} alt="" className=''/>
                                            </div>
                                            </div>
                                    </div>
                                    <div className="">
                                            <div className="">
                                            <div className="">
                                                <img src={cars.image} alt="" className=''/>
                                            </div>
                                            </div>
                                    </div>
                                 
                                    
                                </div>
                            </div>
                    </div>
                </div>
                
            </div> */}

            <div><Footer/></div>
            
        </div>
    );
}

export default Singlepage;
