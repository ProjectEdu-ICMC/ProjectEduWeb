import { API } from '../api.js';

const getAllFromSlide = (module, topic, slide) => {
    return API.get(`/explanation/${module}/${topic}/${slide}`);
};

const create = (data) => {
    return API.post(`/explanation`, data);
};

const update = (id, data) => {
    return API.put(`/explanation/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/explanation/${id}`);
};

const ExplanationModel = {
    getAllFromSlide,
    create,
    update,
    remove
};

export default ExplanationModel;
