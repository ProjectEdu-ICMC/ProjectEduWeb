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

function TheoryForm(props) {
    const { id, mod } = useParams();
    
    const { reset, type, theory } = props;

    const [ , dispatch ] = useContext(MainContext);

    const [ formData, setFormData ] = useReducer(formReducer, {});

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData[type] === undefined || formData[type].length === 0)
            return;

        // dispatch 
        switch(type) {
            case 'text':
                dispatch({
                    type: 'ADD_MAIN_TEXT',
                    module: mod,
                    topic: id,
                    theory: theory,
                    payload: {
                        text: formData.text
                    }
                });
                break;
            case 'subText':
                dispatch({
                    type: 'ADD_SUB_TEXT',
                    module: mod,
                    topic: id,
                    theory: theory,
                    payload: {
                        subText: formData.subText
                    }
                });
                break;
            default:
                dispatch({
                    type: 'ADD_' + type.toUpperCase(),
                    module: mod,
                    topic: id,
                    theory: theory,
                    payload: {
                        src: formData[type]
                    }
                });
                break;
        }

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
    { type === 'text' && <input class='placeholder-gray-800' placeholder='Main Text' type='text' onChange={ handleChange } name='text' /> }
    { type === 'subText' && <input class='placeholder-gray-800' placeholder='Sub Text' type='text' onChange={ handleChange } name='subText' /> }
    { type === 'image' && <input class='placeholder-gray-800' placeholder='Image Link' type='url' onChange={ handleChange } name='image' /> }
    { type === 'video' && <input class='placeholder-gray-800' placeholder='Youtube Link' type='url' onChange={ handleChange } name='video' /> }
                <button className='btn-green btn'>Create</button>
                <div onClick={ () => reset() } className='btn btn-red'>Cancel</div>
            </form>
        </div>
    );
}

export default TheoryForm;