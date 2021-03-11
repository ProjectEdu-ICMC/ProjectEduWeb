import { API } from '../api.js';

const getAllFromSlide = (module, topic, slide) => {
    return API.get(`/expla/${module}/${topic}/${slide}`);
};

//const get = id => {
//    return API.get(`/topic/${id}`);
//};

const create = (data) => {
    return API.post(`/expla`, data);
};

const update = (id, data) => {
    return API.put(`/expla/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/expla/${id}`);
};

const ExplaModel = {
    getAllFromSlide,
    //get,
    create,
    update,
    remove,
};

export default ExplaModel;
