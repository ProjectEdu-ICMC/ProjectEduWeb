import axios from 'axios';

const local = 'localhost';
//const global = '179.211.98.243';

export const API = axios.create({
    //baseURL: `http://${global}:3001`,
    baseURL: `http://${local}:3001`,
    headers: {
        'Content-type': 'application/json'
    }
});

export const config = (token) => {
    if (token) API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
