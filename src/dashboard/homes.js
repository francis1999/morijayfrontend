 import React from 'react';
 import axios from 'axios';
import passport from "../images/passport.jpeg"
import bell from "../images/bell.svg"
import envelope from "../images/envelope.svg"
import logow from "../images/morijaylogo.png" 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../Session/userSession';
import { getToken } from '../Session/userSession';
import { useState, useEffect } from 'react';
import { getUser } from '../Session/userSession';

const Homes = () => {
    const data=getUser()
    const [profile, setProfile]=useState('');
    const navigate = useNavigate();
    const [cars, setCars]=useState([])
    /* 
    const handleLogout = async () => {
 
        await axios.post(`user/Logout`,{
            method: "POST",        
        }).then(function (response) {
            console.log(response);
            if (response.data.message == "Logout") {
                new Swal("You Have Successfully Logged Out!!!");
                removeUserSession("token");
                navigate('/');

            } else {
                alert("Error Logout");
            }
        })

    }; */

    

    /* axios.get(`getcarbyuserid/${user._id}`).then((res)=>{
        setCars(res.data.noofadvert)
        console.log(res.data.noofadvert);
       
         
    })
    const getToken = sessionStorage.getItem("token");
    const loaduserStates = async () => {
       const result=await axios.get("user/singleuser/me",{headers: getToken()})
       .then((res)=>{
        setProfile(res.data.data)
        })
        console.log(result)
    }

    useEffect(() => {
        loaduserStates(); 
    }, []); */
    return (
        <>
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
                <div className='left-div'><span className='fs-4 p-3 mb-2 text-black'>Welcome {/* {user.firstname} - {user.lastname} */}</span>
                
                    
                <div className='py-3'>
                    <div className='container'>
                        <div className='row'>
                        <div className="col-md-3 ">
                                <div className="card">
                                <div className="card-body bg-success">
                                <div className="card-text mt-4 text-white fw-bold">Number of Product Posted</div>
                                    <div className="card-title text-white fw-bold" >{/* {} */}</div>
                                    <div className="card-text"></div>
                                </div>
                                </div>
                         </div>
                        <div className="col-md-3">
                                <div className="card">
                                <div className="card-body bg-primary">
                    
                                <div className="card-text mt-4 text-white fw-bold">Number of Cars Available</div>
                                    <div className="card-title text-white fw-bold" >30</div>
                                    <div className="card-text"></div>
                                    
                                </div>
                                </div>
                         </div>
                        <div className="col-md-3">
                                <div className="card">
                                <div className="card-body bg-secondary">
                    
                                <div className="card-text text-white mt-4 fw-bold">Number of Car Sold</div>
                                    <div className="card-title text-white fw-bold" >10</div>
                                    <div className="card-text"></div>
                                    
                                </div>
                                </div>
                         </div>
                        </div>
                    </div>
               </div>
                 </div>
 
            </div>
            
        </>
    );
}

export default Homes;
 