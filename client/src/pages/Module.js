import React, { useContext, useState } from 'react';

import { useParams, Link, Redirect } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import TopicForm from '../components/forms/TopicForm';
import { MainContext } from '../contexts/MainContext';

function Module(props) {
    const { id } = useParams();

    const [ state, dispatch ] = useContext(MainContext);

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
            { topics ? 
                <>  
                    <CardBoard url={`/topic/${id}`} cardSize={32} data={ topics } update={ () => setOperation('UPDATE') } choose={ setTopic } remove={ removeTopic } dir='col'/>
                    <button className='btn btn-blue' onClick={ () => {
                        setOperation('ADD');
                        setTopic(undefined);
                    } } >Add Topic</button>
                    { operation && <TopicForm reset={ () => setOperation(undefined) } type={ operation } topic={ topic } /> }
                </>: 
                'No modules' }
            <Link className='btn btn-blue' to='/'>
                Back
            </Link>
        </>
   );
}

export default Module;