import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export const API = axios.create({
    baseURL: `http://${server}:3001`,
    headers: {
        'Content-type': 'application/json'
    }
});

export const config = (token) => {
    if (token) API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
