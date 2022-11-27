import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import './Register.css';
import Swal from 'sweetalert2';
import { setUserSession } from '../Session/userSession';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from './Navbar';
const LOGIN_URL = '/auth';
const Login = () => {
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
    axios.post('admin/adminlogin', user).then(response => {
        if (response.data.message == "You have successfully Logged in") {
            console.log(response.data);
            new Swal("You have successfully Logged in")
            /* handleClose() */
            setUserSession(response.data.data.accessToken,response.data.data);
            console.log(response.data.data.accessToken)
            console.log(response.data.data)
            
            //setUserSession(response.data.data);
            navigate('/dashboard/homes');
        }else{
          alert("error")
        }

    })
        .catch(error => {
            if (error.response.message === "Invaid Credentials" || error.response.status === 401) {
              new Swal("Wrong Username and password", error.response.message)
            } else if(error.response.message === "Invalid Email" || error.response.status === 401) {
              new Swal("Invalid Email", error.response.message)
                navigate("index")
            } else if(error.response.message === "Invalid Password" || error.response.status === 401) {
              new Swal("Invalid Password", error.response.message)
                navigate("index")
            }else if(error.response.message === "Empty Credentials Supplied!" || error.response.status === 500){
              new Swal("Error in Credential", error.response.message)
            }else if(error.response.message === "Password Too Small" || error.response.status === 417){
              new Swal("Invalid Password  or Password is too short", error.response.message)
            }
        })
}




    /* const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef(); */

    /* const [user, setUser] = useState(''); */
   /*  const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); */





/* 
    useEffect(() => {
        userRef.current.focus();
    }, []) */

   /*  useEffect(() => {
        setErrMsg('');
    }, [user, pwd]) */

   /*  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`admin/adminlogin`,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    } */

    return (
        <>
        <Navbar/>
           {/*  {success ? (
                <section className='box'>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : ( */}
                <section className=' App container section'>
                    <p /* ref={errRef} className={errMsg ? "errmsg" : "offscreen"} */ aria-live="assertive">{/* {errMsg} */}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            //ref={userRef}
                            autoComplete="off"
                            onChange={handleInputChange}
                            //value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            //value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                           {/*  <a href="http://localhost:3000/sign-up">Sign Up</a> */}
                        </span>
                    </p>
                </section>
          {/*   )} */}
        </>
    )
}

export default Login