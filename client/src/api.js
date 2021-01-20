import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type': 'application/json'
    }
});

export const config = (token) => {
    API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};


