import { API } from '../api.js';

const getAllFromTopic = (module, topic) => {
    return API.get(`/slide/${module}/${topic}`);
};

const create = (data) => {
    return API.post(`/slide`, data);
};

const update = (id, data) => {
    return API.put(`/slide/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/slide/${id}`);
};

const SlideModel = {
    getAllFromTopic,
    create,
    update,
    remove,
};

export default SlideModel;
