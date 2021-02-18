import { API } from '../api.js';

const getAllFromSlide = (module, topic, slide) => {
    return API.get(`/info/${module}/${topic}/${slide}`);
};

//const get = id => {
//    return API.get(`/topic/${id}`);
//};

const create = data => {
    return API.post(`/info`, data);
};

const update = (id, data) => {
    return API.put(`/info/${id}`, data);
};

const remove = id => {
    return API.delete(`/info/${id}`);
};

const InfoModel = {
    getAllFromSlide,
    //get,
    create,
    update,
    remove
};

export default InfoModel;
