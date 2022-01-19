const INIT_STATE = {};

const reducer = (state = INIT_STATE, action) => {
    const { key, type, payload } = action;

    switch (type) {
        case 'ADD_SLIDE':
            return {
                array: [...state.array, payload],
            };

        case 'SET_SLIDES':
            return { array: payload };

        case 'UPDATE_SLIDE':
            return {
                array: [
                    ...state.array.slice(0, key),
                    {
                        ...payload,
                    },
                    ...state.array.slice(key + 1),
                ],
            };

        case 'DELETE_SLIDE':
            return {
                array: [
                    ...state.array.slice(0, key),
                    ...state.array.slice(key + 1),
                ],
            };

        //case 'MOVE_SLIDE':
        //    const { drag, drop } = payload;
        //    const dragged = state.array[drag];

        //    if (drag < drop)
        //        return {
        //            array: [
        //                ...state.array.slice(0, drag),
        //                ...state.array.slice(drag + 1, drop),
        //                {
        //                    ...dragged
        //                },
        //                ...state.array.slice(drop)
        //            ]
        //        }

        //    if (drag > drop)
        //        return {
        //            array: [
        //                ...state.array.slice(0, drop),
        //                {
        //                    ...dragged
        //                },
        //                ...state.array.slice(drop, drag),
        //                ...state.array.slice(drag + 1)
        //            ]
        //        }

        //    return state;

        default:
            return state;
    }
};

export default reducer;
