import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000/'
    baseURL: "https://rocky-brook-58200.herokuapp.com/"
});

export default instance;