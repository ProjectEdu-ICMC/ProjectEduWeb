import React, { useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { LanguageContext } from '../../contexts/LanguageContext';

//import SlideModel from '../../actions/Slide';

function TopicForm(props) {
    const { mod, topic } = useParams();

    const { register, handleSubmit, errors } = useForm();
    const { reset, type, slide } = props;

    const [ dict, ] = useContext(LanguageContext);

    const dispatch = useDispatch();
    const initData = undefined; //useSelector(state => state.slide?[slide]);

    const onSubmit = (data) => {
        const { name } = data;

        if (!slide) {
            // TODO: create Slide
            //TopicModel.create({
            //    name,
            //    module: mod
            //}).then(result => dispatch({
            //    type: 'ADD_TOPIC',
            //    payload: {
            //        [result.data.topic_id]: {
            //            name
            //        }
            //    }
            //}))
            //.catch(error => {
            //    console.log(error);
            //});
        } else {
            // TODO: update Slide
            //TopicModel.update(topic, {
            //    name,
            //    module: mod
            //}).then(result => dispatch({
            //    type: 'UPDATE_TOPIC',
            //    id: topic,
            //    payload: {
            //        [result.data.topic_id]: {
            //            name
            //        }
            //    }
            //}))
            //.catch(error => {
            //    console.log(error);
            //});
        }

        reset();
    };

    return ( 
        <div className='w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0'>
            <form className='bg-white p-10 rounded flex flex-col shadow-lg' onSubmit={ handleSubmit(onSubmit) } >
                <span className='text-lg font-bold ml-1 mb-4 text-gray-800'>
                    { `${type} Slide` }
                </span>
                <label 
                    className='text-sm text-gray-500 ml-1 mt-2'
                    htmlFor='name'>Tipo do Slide</label>
                <select
                    className='bg-white overflow-hidden shadow p-1 rounded text-md outline-none focus:shadow-outline' 
                    type='text' 
                    ref={ register({ required: 'Selecione um tipo para o Slide' }) }
                    //defaultValue={ initData?.type }
                    name='name' 
                >
                    <option value='iinfo'>Item de Informação</option>
                    <option value='eexplo'>Elemento Exploratório</option>
                    <option value='eexpla'>Elemento Explanatório</option>
                    <option value='eaval'>Elemento de Avaliação</option>
                </select>
                { errors.name && <p className='text-red-700 text-sm px-1'> 
                    { errors.name.message } 
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

export default TopicForm;
