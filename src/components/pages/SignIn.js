import React from 'react';
import '../../App.css';
import Login from '../Login';
import Register from '../Register';
import Footer from '../Footer';
import Navbar from '../Navbar';

function SignIn() {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  )
}

export default SignIn;
