const INIT_STATE = {
};

const reducer = (state = INIT_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_MODULE":
            return { ...state, ...payload };
        
        case "SET_MODULES":
            return { ...payload };

        case 'UPDATE_MODULE':
            return { ...state, ...payload };
        //case "":
        //    return { ...state, token: null }

        default:
            return state;
    }
};

export default reducer;
