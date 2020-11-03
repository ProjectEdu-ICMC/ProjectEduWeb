import React, { useContext, useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import { MainContext } from '../../contexts/MainContext';

const formReducer = (state, action) => {
    if (action.reset) {
        return {};
    }

    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                ...action.payload
            };
        
        default:
            return {
                ...state,
                [action.name]: action.value
            };

    }
};

function TopicForm(props) {
    const { id } = useParams();

    const { reset, type, topic } = props;
    const [ state, dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);

    const [ formData, setFormData ] = useReducer(formReducer, {
        name: ''
    });

    useEffect(() => {
        if (topic !== undefined) {
            const { topicName } = state.data[id].subModuleTopics[topic];
            setFormData({
                type: 'INIT',
                payload: {
                    name: topicName
                }
            });
        }
    }, [id, topic, state]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name === undefined || formData.name.length === 0)
            return;

        const theories = type === dict.add ? {
            topicTheory: []
        } : {};
        
        const exercises = type === dict.add ? {
            topicExercises: []
        } : {};

        dispatch({
            type: `${type}_TOPIC`, 
            module: id,
            topic: topic,
            payload: {
                topicName: formData.name,
                ...theories,
                ...exercises
            }
        });

        setFormData({
            reset: true
        });

        reset();
    };

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        });
    };

    return ( 
        <div className='w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed top-0 left-0'>
            <form className='screen-form' onSubmit={ handleSubmit } >
                <span className='text-lg'>{ `${type} ${dict.topic}` }</span>
                <input className='placeholder-gray-800' placeholder={ dict.topName } type='text' onChange={ handleChange } name='name' value={ formData.name } />
                <button className='btn-green btn'>{ type }</button>
                <div onClick={ () => reset() } className='btn btn-red'>{ dict.cancel }</div>
            </form>
        </div>
    );
}

export default TopicForm 