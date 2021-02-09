const INIT_STATE = {
};

const reducer = (state = INIT_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_TOPIC":
            return { ...state, ...payload };
        
        case "SET_TOPICS":
            return { ...payload };

        case 'UPDATE_TOPIC':
            return { ...state, ...payload };

        case 'DELETE_TOPIC':
            const { [ payload ]: delMod, ...newState } = state;
            return { ...newState };

        default:
            return state;
    }
};

export default reducer;
