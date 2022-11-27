import axios from 'axios';

export default axios.create({
    baseURL: 'https://morijaybackend.herokuapp.com/api/'
});