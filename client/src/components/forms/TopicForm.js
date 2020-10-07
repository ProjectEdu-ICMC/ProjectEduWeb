import React, { useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContext';

const formReducer = (state, action) => {
    if (action.reset) {
        return {};
    }

    return {
        ...state,
        [action.name]: action.value
    };
};

function TopicForm(props) {
    const { id } = useParams();

    const { reset } = props;

    const [ , dispatch ] = useContext(MainContext);

    const [ formData, setFormData ] = useReducer(formReducer, {});

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name === undefined || formData.name.length === 0)
            return;

        dispatch({
            type: 'ADD_TOPIC',
            module: id,
            payload: {
                topicName: formData.name,
                topicTheory: [],
                topicExercises: []
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
        <div className='w-full h-screen flex items-center justify-center bg-opacity-75 bg-black absolute top-0 left-0'>
            <form className='screen-form' onSubmit={ handleSubmit } >
                <input class='placeholder-gray-800' placeholder='Module Name' type='text' onChange={ handleChange } name='name' />
                <button className='btn-green btn'>Create</button>
                <div onClick={ () => reset() } className='btn btn-red'>Cancel</div>
            </form>
        </div>
    );
}

export default TopicForm 