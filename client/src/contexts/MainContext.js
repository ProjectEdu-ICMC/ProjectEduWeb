import React, { useReducer, createContext } from 'react';

export const MainContext = createContext();

const initial = {
    data: undefined
}

const reducer = (state, action) => {
    const { module, payload } = action;
    
    switch (action.type) {
        case 'SET_DATA':
            return {
                data: action.payload
            };
        case 'CLEAR_DATA':
            return {
                data: undefined
            };
        case 'ADD_MODULE':
            if (state.data === undefined)
                return state;
            return {
                data: [
                    ...state.data,
                    action.payload
                ]
            };
        
        case 'UPDATE_MODULE':
            if (state.data === undefined || state.data.length === 0) 
                return state;

            return {
                data: [
                    ...state.data.slice(0, module),
                    {
                        ...state.data[module],
                        ...payload
                    },
                    ...state.data.slice(module + 1)
                ]
            };

        case 'REMOVE_MODULE':
            if (state.data === undefined || state.data.length <= module) 
                return state;
            
            return {
                data: [
                    ...state.data.slice(0, module),
                    ...state.data.slice(module + 1)
                ]
            };

        case 'ADD_TOPIC':
            if (state.data === undefined || 
                state.data[action.module] === undefined)
                return state;

            // TODO: clear var names
            if (state.data[action.module].subModuleTopics === undefined)
                state.data[action.module].subModuleTopics = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics,
                            action.payload
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

        case 'ADD_EXERCISE':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined)
                return state;
            
            // TODO: clear var names
            if (state.data[action.module].subModuleTopics[action.topic].topicExercises === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicExercises = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicExercises: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicExercises,
                                    action.payload
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }
        
        case 'ADD_THEORY':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined)
                return state;
            
            // TODO: clear var names
            if (state.data[action.module].subModuleTopics[action.topic].topicTheory === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicTheory = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicTheory: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory,
                                    action.payload
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

        case 'ADD_MAIN_TEXT':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined || 
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory] === undefined)
                return state;

            if (state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].mainTexts === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].mainTexts = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicTheory: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(0, action.theory),
                                    {
                                        ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory],
                                        mainTexts: [
                                            ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].mainTexts,
                                            action.payload
                                        ]
                                    },
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(action.theory + 1)
                                    
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

        case 'ADD_SUB_TEXT':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined || 
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory] === undefined)
                return state;

            if (state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].subTexts === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].subTexts = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicTheory: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(0, action.theory),
                                    {
                                        ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory],
                                        subTexts: [
                                            ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].subTexts,
                                            action.payload
                                        ]
                                    },
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(action.theory + 1)
                                    
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

        case 'ADD_IMAGE':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined || 
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory] === undefined)
                return state;

            if (state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].images === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].images = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicTheory: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(0, action.theory),
                                    {
                                        ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory],
                                        images: [
                                            ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].images,
                                            action.payload
                                        ]
                                    },
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(action.theory + 1)
                                    
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

        case 'ADD_VIDEO':
            if (state.data === undefined || 
                state.data[action.module] === undefined ||
                state.data[action.module].subModuleTopics[action.topic] === undefined || 
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory] === undefined)
                return state;

            if (state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].videos === undefined)
                state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].videos = []

            return {
                data: [
                    ...state.data.slice(0, action.module),
                    {
                        ...state.data[action.module],
                        subModuleTopics: [
                            ...state.data[action.module].subModuleTopics.slice(0, action.topic),
                            {
                                ...state.data[action.module].subModuleTopics[action.topic],
                                topicTheory: [
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(0, action.theory),
                                    {
                                        ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory],
                                        videos: [
                                            ...state.data[action.module].subModuleTopics[action.topic].topicTheory[action.theory].videos,
                                            action.payload
                                        ]
                                    },
                                    ...state.data[action.module].subModuleTopics[action.topic].topicTheory.slice(action.theory + 1)
                                    
                                ]
                            },
                            ...state.data[action.module].subModuleTopics.slice(action.topic + 1)
                        ]
                    },
                    ...state.data.slice(action.module + 1)
                ]
            }

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