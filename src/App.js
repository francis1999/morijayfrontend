import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Homes from './dashboard/homes';
import Addproduct from './dashboard/addproduct';
import { getToken } from './Session/userSession';
import { useEffect } from 'react';
import Login from './components/Login';
import AdminRegistration from './components/adminRegistration';
import Singlepage from './components/singlepage';

function App() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/dashboard/homes" name="" element={<Homes/>}/>
          <Route exact path='/' name="Home Page" element={<Home/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/singlepage/:_id" element={<Singlepage/>} />
          <Route path='/admin' element={<AdminRegistration/>}/>
          <Route path="/dashboard/addproduct" name="Add Product" element={<Addproduct/>}/>
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
