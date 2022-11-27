import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
axios.defaults.baseURL = 'https://morijaybackend.herokuapp.com/api/';
ReactDOM.render(<App />, document.getElementById('root'));
