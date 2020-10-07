import React, { useContext, useReducer } from 'react';
import { MainContext } from '../../contexts/MainContext';

const formReducer = (state, action) => {
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
                <input placeholder='Module Name' type='text' onChange={ handleChange } name='name' />
                <input placeholder='Module Image' type='url' onChange={ handleChange } name='image' />
                <button className='btn-green btn'>Criar</button>
            </form>
        </div>
    );
}

export default ModuleForm