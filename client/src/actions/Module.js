import { API } from '../api.js';

const getAll = () => {
    return API.get('/module');
};

const get = (id) => {
    return API.get(`/module/${id}`);
};

const create = (data) => {
    return API.post('/module', data);
};

const update = (id, data) => {
    return API.put(`/module/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/module/${id}`);
};

const ModuleModel = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default ModuleModel;
