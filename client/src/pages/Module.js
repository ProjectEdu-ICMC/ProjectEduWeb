import React, { useContext } from 'react';

import { useParams, Link, Redirect } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import { MainContext } from '../contexts/MainContext';

function Module(props) {
    const { id } = useParams();
    const [ state, dispatch ] = useContext(MainContext);

    if (!state.data) 
        return ( <Redirect to='/' /> );

    const addTopic = (event) => {
        dispatch({
            type: 'ADD_TOPIC',
            module: id,
            payload: {
                topicName: "Place holder Topic Name",
                topicTheory: [],
                topicExercises: []
            }
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
                    <CardBoard url={ `/topic/${id}` } cardSize={32} data={ topics } /> 
                    <button className='btn btn-blue' onClick={ addTopic }>Add Topic</button>
                </>: 
                'No modules' }
            <Link className='btn btn-blue' to='/'>
                Back
            </Link>
        </>
   );
}

export default Module;