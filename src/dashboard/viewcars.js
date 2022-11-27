import React from 'react';
import Nav from './Nav/Nav';
import passport from "../images/passport.jpeg"
import bell from "../images/bell.svg"
import envelope from "../images/envelope.svg"
import logow from "../images/logow.png"
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import BasicTable from './Nav/BasicTable';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { GrFormView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import { useParams } from 'react-router';
import handleLogout from './home'
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../Session/userSession';
import { getUser } from '../Session/userSession';

const data = localStorage.getItem("data");
const Viewcars = () => {
const [userCars, setUserCars]=useState([])
const [loading, setLoading]=useState(true)
const [getdata, setGetdata]=useState([])
const { _id } = useParams();
const user=getUser()

const handdleDelete = async (_id) => {
    const getToken = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ` + localStorage.getItem('token')
    }
    await axios.delete(`deletecar/${_id}`, { headers }).then(() => {
        new Swal("Car Successfully Deleted");

    })

}

useEffect(()=>{
    const datas=JSON.parse(localStorage.getItem('data'))
    if(datas){
        setGetdata(datas)
    }
},[])

const getToken = localStorage.getItem("token");
const navigate = useNavigate();
const handleLogout = async (props) => {
    
    
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
useEffect(()=>{
    let mounted=true
    const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ` + localStorage.getItem('token')
    }
    axios.get(`getcarbyuserid/${user._id}`,{headers}).then((res)=>{
        if(mounted){
            if(res.data.message==="success"){
                setUserCars(res.data.data)
                setLoading(false)
                
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
}else
{
   var showallcars=''
   showallcars=userCars.map((car, index)=>{
       return(
           <></>
       )
   })
}


const carlisttables = [
    {
        Header: 'DESCRIPTION',
        accessor: 'description',
        width:'90',
        minWidth: 50,
        maxWidth: 50,
    },
    {
        Header: 'PRICE',
        accessor: 'price'
    },
    {
        Header: 'CONDITION',
        accessor: 'condition'
    },
    {
        Header: 'POST DATE',
        accessor: 'createdAt'
    },
    {
        Header: 'Action',
        accessor: '_id',
        Cell: (e) => {
            return (
                <>
                    <span><span className="viewbutton"> <RiEdit2Fill /> </span> <span className="viewbutton"><Link to={`singlecar/${e.value}`}> <GrFormView /></Link></span> <span className="deletebutton" onClick={() => handdleDelete(e.value)}> <MdDelete /> </span></span>
                </>
            )
        }
    }
]

    return (
        <div>
            <div className='dashboard-header justify-content-between d-flex p-2'>
            <div className=''>
                <div className='dashboard-logo'><img src={logow} alt="logo"/></div>
            </div>
            <div className='right-nav justify-content-between d-flex'>
            <div className='ml text-white'>{user.firstname}-{user.lastname}</div>
                    <div className='ml'><img src={envelope} alt="Message Bell" /></div>
                    <div className='ml'><img src={bell} alt="notification Bell" /></div>
                    <div className='ml'><img src={passport} alt="profile Picture" /></div>
            </div>
        </div>
            <div className='d-flex justify-content-between'>

                <div className='right-div'>
                    <div><Link to="/dashboard/home">DASHBOARD</Link></div>
                    <div><Link to="/dashboard/addcar">Add Car</Link></div>
                    <div><Link to="#">View All Cars</Link></div>
                    <div><Link to="/dashboard/logout" onClick={handleLogout}>Logout</Link></div>
                </div>
                <div className='left-div'>
                    <div className='mt-4 mb-4 fs-4'>All Cars</div>
                    <BasicTable columnsProps={carlisttables} recordsProps={userCars} />
                </div>
            </div>
        </div>
    );
}

export default Viewcars;
