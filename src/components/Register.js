import React from "react";
import { useRef, useState, useEffect } from "react";
import './Register.css';

// import {Link} from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z ]{4,40}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEX = /^[0-9]{11}$/;
const EMAIL_REGEX = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z].{2,40}$/);
const REGISTER_URL = 'admin/registration';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [num, setNum] = useState('');
    const [validNum, setValidNum] = useState(false);
    const [numFocus, setNumFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);





//This is the code to validate inputs
const registerAdmin = {
    fullname: "",
    email: "",
    number: "",
    password: ""
};



const [registration, setRegistration] = useState(registerAdmin)

const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setRegistration({ ...registration, [name]: value })
}
const handleSubmit = (e) => {
    e.preventDefault();
    const getToken = localStorage.getItem("token");
    axios.post(`admin/registration`, registration, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getToken}`,
        },
    }).then((response) => {
        setRegistration(response.data)
        if (response.message = "succesful") {
            new Swal("Admin Registered Successfully");
            //return <Navigate replace to="/index.js" />
            window.location.href="/";
        }else{
            new Swal("Oops!!!, something went wrong");
        }
    }).catch((err) => {
        if (err.message = "Admin Already Exist") {
            new Swal("Email has already been taken.");
        }else if(err.message = "The given data was invalid"){
            new Swal("The given data was invalid"); 
        }else{
            new Swal("Oops!!!, something went wrong");
        }
    });


}
















    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

    useEffect(() => {
      setValidNum(NUM_REGEX.test(num));
  }, [num])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, num, pwd, matchPwd])

    // /* const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // if button enabled with JS hack
    //     const v1 = USER_REGEX.test(user);
    //     const v2 = PWD_REGEX.test(pwd);
    //     const v3 = EMAIL_REGEX.test(email);
    //     const v4 = NUM_REGEX.test(num);
    //     if (!v1 || !v2 || !v3 || !v4) {
    //         setErrMsg("Invalid Entry");
    //         return;
    //     }
    //     try {
    //         const response = await axios.post(REGISTER_URL,
    //             JSON.stringify({ user, email, num, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         /* console.log(response?.data);
    //         console.log(response?.accessToken);
    //         console.log(JSON.stringify(response)) */
    //         setSuccess(true);
    //         //clear state and controlled inputs
    //         //need value attrib on inputs for this
    //         setUser('');
    //         setEmail('');
    //         setNum('');
    //         setPwd('');
    //         setMatchPwd('');
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setErrMsg('Username Taken');
    //         } else {
    //             setErrMsg('Registration Failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

    return (
        <>
            {success ? (
                <section className="section">
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className=" container section">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Fullname:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="fullname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleInputChange}
                            //value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleInputChange}
                            //value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 40 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, dots and @ are allowed.
                        </p>

                        <label htmlFor="number">
                            Number:
                            <FontAwesomeIcon icon={faCheck} className={validNum ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNum || !num ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleInputChange}
                            //value={num}
                            required
                            aria-invalid={validNum ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNumFocus(true)}
                            onBlur={() => setNumFocus(false)}
                        />

                        


                        <label htmlFor="password">
                            Password:
                            {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} /> */}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            //value={pwd}
                            required
                            //aria-invalid={validPwd ? "false" : "true"}
                            //aria-describedby="pwdnote"
                            //onFocus={() => setPwdFocus(true)}
                            //onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" /* className={pwdFocus && !validPwd ? "instructions" : "offscreen"} */>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={handleInputChange}
                            //value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="signup-button">Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/Login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register