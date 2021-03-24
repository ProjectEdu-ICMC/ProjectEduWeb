const INIT_STATE = {};

const reducer = (state = INIT_STATE, action) => {
    const { key, type, payload } = action;

    switch (type) {
        case 'ADD_EXPLORATION':
            return {
                array: [...state.array, payload]
            };

        case 'SET_EXPLORATION':
            return { array: payload };

        case 'UPDATE_EXPLORATION':
            return {
                array: [
                    ...state.array.slice(0, key),
                    {
                        ...payload
                    },
                    ...state.array.slice(key + 1)
                ]
            };

        case 'DELETE_EXPLORATION':
            return {
                array: [
                    ...state.array.slice(0, key),
                    ...state.array.slice(key + 1)
                ]
            };

        default:
            return state;
    }
};

export default reducer;
