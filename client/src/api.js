import axios from 'axios';

const server = 'localhost';
//const server = '179.211.98.243';

export const API = axios.create({
    baseURL: `http://${server}:3001`,
    headers: {
        'Content-type': 'application/json'
    }
});

export const config = (token) => {
    if (token) API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
