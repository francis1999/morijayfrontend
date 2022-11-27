import React from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../../Session/userSession';

const Home = () => {
   const getToken = localStorage.getItem("token");
   const navigate = useNavigate();
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
   return (
       <>
      
       </>
   );
}

export default Home;
