import React, { useContext, useEffect, useReducer } from 'react';
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

function ModuleForm(props) {
    const { reset, type, module } = props;

    const [ state, dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);

    const [ formData, setFormData ] = useReducer(formReducer, {
        name: '',
        image: ''
    });

    useEffect(() => {
        if (module !== undefined) {
            const { subModuleName, subModuleImage } = state.data[module];
            setFormData({
                type: 'INIT',
                payload: {
                    name: subModuleName,
                    image: subModuleImage
                }
            });
        }
    }, [module, state]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name === undefined || formData.name.length === 0)
            return;

        if (formData.image === undefined || formData.image.length === 0)
            return;
            
        const topics = type === dict.add ? {
            subModuleTopics: []
        } : {};

        
        dispatch({
            type: `${type}_MODULE`,
            module: module,
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
                <span className='text-lg'>{ `${type} ${dict.module}` }</span>
                <input className='placeholder-gray-800' placeholder={ dict.modName } type='text' onChange={ handleChange } name='name' value={ formData.name } />
                <input className='placeholder-gray-800' placeholder={ dict.modImg } type='url' onChange={ handleChange } name='image' value={ formData.image } />
                <button className='btn-green btn'>{ type }</button>
                <div onClick={ () => reset() } className='btn btn-red'>{ dict.cancel }</div>
            </form>
        </div>
    );
}

export default ModuleForm;