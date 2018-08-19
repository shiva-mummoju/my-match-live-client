import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rocky-brook-58200.herokuapp.com/'
});

export default instance;