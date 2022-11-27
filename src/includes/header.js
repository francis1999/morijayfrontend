import React from 'react';
import { Navbar,Container,Nav,NavDropdown, Form,FormControl,Button } from 'react-bootstrap';
import logow from "../images/logow.png"
import { useState } from 'react';
import {Modal} from "react-bootstrap"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../Session/userSession';
import Swal from 'sweetalert2';

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = {
    email: "",
    password: "",
}; 
const [user, setUser] = useState(userLogin)
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
}

  

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('user/userlogin', user).then(response => {
        if (response.data.message === "You have successfully Logged in") {
            console.log(response.data);
            new Swal("success","You have successfully Logged in")
            handleClose()
            setUserSession(response.data.token,response.data.data[0]);
            //setUserSession(response.data.data);
            navigate('/dashboard/home');
        }else{
          alert("error")
        }

    })
        .catch(error => {
            if (error.response.message === "Invaid Credentials" || error.response.status === 401) {
              new Swal("Wrong Username and password", error.response.message)
            } else if(error.response.message === "Invalid Email Name" || error.response.status === 401) {
              new Swal("Invalid Credential", error.response.message)
                navigate("index")
            }else if(error.response.message === "Empty Credentials Supplied!" || error.response.status === 500){
              new Swal("Empty Credential", error.response.message)
            }else if(error.response.message === "Password Too Small" || error.response.status === 417){
              new Swal("Invalid Password  or Password is too short", error.response.message)
            }
        })
}

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className='fixed-top'>
              <Container fluid>
                <Navbar.Brand href="#"><img src={logow} alt="logo" className='logoo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="/" className='fs-5'>Home</Nav.Link>
                    <Nav.Link href="products" className='fs-5'>Product</Nav.Link>
                  </Nav>
                    <Button variant="outline-success" onClick={handleShow}>Login</Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="name@example.com" autoFocus onChange={handleInputChange} /></Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="***********" autoFocus onChange={handleInputChange}/></Form.Group>

                        
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
};

export default Header;
