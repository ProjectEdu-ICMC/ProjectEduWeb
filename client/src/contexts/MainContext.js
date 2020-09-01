import React, { useReducer, createContext } from 'react';

export const MainContext = createContext();

const initial = {
    data: undefined
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                data: action.payload
            };
        case 'CLEAR_DATA':
            return {
                data: undefined
            };
        default:
            throw new Error('Reducer (Main) couldn\'t handle action');
    }
}

export function MainContextProvider(props) {
    const [ state, dispatch ] = useReducer(reducer, initial);

    return (
        <MainContext.Provider value={[ state, dispatch ]}>
            { props.children }
        </MainContext.Provider>
   );
}