import { API } from '../api.js';

const getAllFromModule = (module) => {
    return API.get(`/topic/${module}`);
};

const create = (data) => {
    return API.post(`/topic`, data);
};

const update = (id, data) => {
    return API.put(`/topic/${id}`, data);
};

const remove = (id) => {
    return API.delete(`/topic/${id}`);
};

const TopicModel = {
    getAllFromModule,
    create,
    update,
    remove,
};

export default TopicModel;
