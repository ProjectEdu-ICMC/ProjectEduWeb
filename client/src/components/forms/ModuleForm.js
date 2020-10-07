import React, { useContext, useReducer } from 'react';
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

function ModuleForm(props) {
    const { reset } = props;

    const [ , dispatch ] = useContext(MainContext);

    const [ formData, setFormData ] = useReducer(formReducer, {});

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name === undefined || formData.name.length === 0)
            return;

        if (formData.image === undefined || formData.image.length === 0)
            return;

        dispatch({
            type: 'ADD_MODULE',
            payload: {
                subModuleName: formData.name, 
                subModuleImage: formData.image,
                subModuleTopics: [],
                subModuleExercises: []
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
                <input class='placeholder-gray-800' placeholder='Module Name' type='text' onChange={ handleChange } name='name' />
                <input class='placeholder-gray-800' placeholder='Module Image' type='url' onChange={ handleChange } name='image' />
                <button className='btn-green btn'>Create</button>
                <div onClick={ () => reset() } className='btn btn-red'>Cancel</div>
            </form>
        </div>
    );
}

export default ModuleForm