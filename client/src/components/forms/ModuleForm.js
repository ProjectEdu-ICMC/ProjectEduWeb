import React, { useContext, useEffect, useReducer } from 'react';
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

function ModuleForm(props) {
    const { reset, type, id } = props;

    const [ state, dispatch ] = useContext(MainContext);

    const [ formData, setFormData ] = useReducer(formReducer, {});

    useEffect(() => {
        if (id !== undefined) {
            const { subModuleName, subModuleImage } = state.data[id];
            setFormData({
                type: 'INIT',
                payload: {
                    name: subModuleName,
                    image: subModuleImage
                }
            });
        }
    }, [id, state]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name === undefined || formData.name.length === 0)
            return;

        if (formData.image === undefined || formData.image.length === 0)
            return;
            
        const topics = type === 'ADD' ? {
            subModuleTopics: []
        } : {};

        
        dispatch({
            type: `${type}_MODULE`,
            module: id,
            payload: {
                subModuleName: formData.name, 
                subModuleImage: formData.image,
                ...topics
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
                <span className='text-lg'>{ type }</span>
                <input class='placeholder-gray-800' placeholder='Module Name' type='text' onChange={ handleChange } name='name' value={ formData.name } />
                <input class='placeholder-gray-800' placeholder='Module Image' type='url' onChange={ handleChange } name='image' value={ formData.image } />
                <button className='btn-green btn'>{ type }</button>
                <div onClick={ () => reset() } className='btn btn-red'>Cancel</div>
            </form>
        </div>
    );
}

export default ModuleForm;