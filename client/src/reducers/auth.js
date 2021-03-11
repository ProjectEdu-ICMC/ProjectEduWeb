const INIT_STATE = {
    token: null,
};

const reducer = (state = INIT_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SIGN_IN':
            return { ...state, token: payload };

        case 'SIGN_OUT':
            return { ...state, token: null };

        default:
            return state;
    }
};

export default reducer;
