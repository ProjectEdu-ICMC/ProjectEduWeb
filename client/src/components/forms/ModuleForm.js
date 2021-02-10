import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { LanguageContext } from '../../contexts/LanguageContext';

import ModuleModel from '../../actions/Module.js';

function ModuleForm(props) {
    const { reset, type, module } = props;
    
    const { register, handleSubmit, errors } = useForm();
    const [ dict, ] = useContext(LanguageContext);

    const dispatch = useDispatch();
    const initData = useSelector(state => state.module[module]);

    const onSubmit = (data) => {
        const { name, image } = data;

        if (!module) {
            ModuleModel.create({
                name, 
                image
            }).then(result => dispatch({
                type: 'ADD_MODULE',
                payload: {
                    [result.data.module_id]: {
                        name,
                        image
                    }
                }
            }))
            .catch(error => {
                console.log(error);
            });
        } else {
            ModuleModel.update(module, {
                name,
                image
            }).then(result => dispatch({
                type: 'UPDATE_MODULE',
                id: module,
                payload: {
                    [result.data.module_id]: {
                        name,
                        image
                    }
                }
            }))
            .catch(error => console.log(error));

        }

        reset();
    };

    return ( 
        <div className='w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0'>
            <form className='bg-white p-10 rounded flex flex-col shadow-lg' onSubmit={ handleSubmit(onSubmit) } >
                <span className='text-lg font-bold ml-1 mb-4 text-gray-800'>{ `${type} ${dict.module}` }</span>
                <label 
                    className='text-sm text-gray-500 ml-1 mt-2'
                    htmlFor='name'>{ dict.modName }</label>
                <input 
                    className='shadow p-1 rounded text-md outline-none focus:shadow-outline' 
                    type='text' 
                    ref={ register({ required: 'Enter module name' }) }
                    defaultValue={ initData?.name }
                    name='name' 
                />
                { errors.name && <p className='text-red-700 text-sm px-1'> 
                    { errors.name.message } 
                </p> }
                <label 
                    className='text-sm text-gray-500 ml-1 mt-2'
                        htmlFor='image'>{ dict.modImg }</label>
                <input 
                    className='shadow p-1 rounded text-md outline-none focus:shadow-outline' 
                    type='url' 
                    ref={ register }
                    defaultValue={ initData?.image }
                    name='image' 
                />
                { errors.image && <p className='text-red-700 text-sm px-1'> 
                    { errors.image.message } 
                </p> }
                <button 
                    className='bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'
                >{ type }</button>
                <div 
                    className='bg-red-500 hover:bg-red-600 py-2 mt-2 rounded text-center cursor-pointer text-white font-bold shadow focus:outline-none focus:shadow-outline'
                    onClick={ () => reset() }>{ dict.cancel }</div>
            </form>
        </div>
    );
}

export default ModuleForm;
