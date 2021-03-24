import { API } from '../api.js';

const getAllFromSlide = (module, topic, slide) => {
    return API.get(`/exploration/${module}/${topic}/${slide}`);
};

const create = (data) => {
    return API.post(`/exploration`, data);
};

const update = (id, data) => {
    return API.put(`/exploration/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/exploration/${id}`);
};

const ExplorationModel = {
    getAllFromSlide,
    create,
    update,
    remove
};

export default ExplorationModel;
