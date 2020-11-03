import React, { useContext, useState } from 'react';

import { useParams, Link, Redirect } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import TopicForm from '../components/forms/TopicForm';
import { LanguageContext } from '../contexts/LanguageContext';
import { MainContext } from '../contexts/MainContext';

function Module(props) {
    const { id } = useParams();

    const [ state, dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);

    const [ operation, setOperation ] = useState(undefined);
    const [ topic, setTopic ] = useState(undefined);

    if (!state.data) 
        return ( <Redirect to='/' /> );

    const removeTopic = (topic) => {
        dispatch({
            type: 'REMOVE_TOPIC',
            module: id,
            topic
        });
    }
    
    const topics = state.data[id].subModuleTopics.map((topic) => {
        return {
            name: topic.topicName
        }
    });

    return (
        <>
            <Header />
            { topics ? 
                <>  
                    <CardBoard url={`/topic/${id}`} cardSize={32} data={ topics } update={ () => setOperation(dict.update) } choose={ setTopic } remove={ removeTopic } dir='col'/>
                    <button className='btn btn-blue' onClick={ () => {
                        setOperation(dict.add);
                        setTopic(undefined);
                    } } >{ dict.addTopic } </button>
                    { operation && <TopicForm reset={ () => setOperation(undefined) } type={ operation } topic={ topic } /> }
                </>: 
                'No modules' }
            <Link to='/'>
                <button className='btn btn-red'>
                    { dict.back }
                </button> 
            </Link>
        </>
   );
}

export default Module;