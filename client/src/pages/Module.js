import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import TopicForm from '../components/forms/TopicForm';
//import { LanguageContext } from '../contexts/LanguageContext';
import TopicModel from '../actions/Topic.js';

function Module(props) {
    const { mod } = useParams();

    //const [ dict, ] = useContext(LanguageContext);

    const [ operation, setOperation ] = useState(false);
    const [ topic, setTopic ] = useState(undefined);

    const dispatch = useDispatch();
    const data = useSelector(state => state.topic.array);

    useEffect(() => {
        const fetchTopics = async () => {
            const res = await TopicModel.getAllFromModule(mod);
            dispatch({
                type: 'SET_TOPICS',
                payload: res.data
            });
        };

        fetchTopics();
    }, [ dispatch, mod ]);
    
    const deleteTopic = async (index) => {
        const { id } = data[index];
        const res = await TopicModel.remove(id);
        dispatch({
            type: 'DELETE_TOPIC',
            payload: res.data.topic_id,
            key: Number(index)
        });
    };

    return (
        <>
            <Header />
            <div className='p-10 w-full'></div>
            <div className='mx-auto container'>
                <CardBoard 
                    url={`/topic/${mod}`} 
                    cardSize={32} 
                    data={ data } 
                    update={ () => setOperation(true) } 
                    choose={ setTopic } 
                    remove={ deleteTopic } 
                    dir='col'
                /> 
                <div className='p-10 w-full'></div>
                <div className='justify-between flex bg-white container p-4 z-20 fixed bottom-0 shadow'>
                    <div>
                        <button 
                            className='hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                            onClick={ () => { 
                                setOperation(true);
                                setTopic(undefined);
                            } }
                        >
                            Adicionar Tópico
                        </button>
                    </div>
                    <Link to='/'>
                        <button 
                            className='hover:bg-red-600 bg-red-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'>
                            Voltar
                        </button> 
                    </Link>
                </div>
            </div> 
            { operation && 
                <TopicForm 
                    reset={ () => setOperation(false) } 
                    topic={ topic }
                /> 
            }
        </>
   );
}

export default Module;
