import { API } from '../api.js';

const getAllFromModule = module => {
    return API.get(`/topic/all/${module}`);
};

const get = id => {
    return API.get(`/topic/${id}`);
};

const create = data => {
    return API.post(`/topic`, data);
};

const update = (id, data) => {
    return API.put(`/topic/${id}`, data);
};

const remove = id => {
    return API.delete(`/topic/${id}`);
};

const TopicModel = {
    getAllFromModule,
    get,
    create,
    update,
    remove
};

export default TopicModel;
