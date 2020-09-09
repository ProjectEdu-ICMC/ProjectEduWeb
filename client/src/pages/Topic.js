import React, { useContext } from 'react';

import { useParams, Link, Redirect } from 'react-router-dom';
import { MainContext } from '../contexts/MainContext';
import Exercise from '../components/Exercise';
import Theory from '../components/Theory';

function Topic(props) {
    const { mod, id } = useParams();
    const [ state, ] = useContext(MainContext);

    if (!state.data) 
        return ( <Redirect to='/' /> );

    const topic = state.data[mod].subModuleTopics[id];
    console.log(topic);

    const theories = topic.topicTheory ? topic.topicTheory.map((theory, index) => 
        <Theory key={ index } data={ theory } />) : undefined;

    const exercises = topic.topicExercises ? topic.topicExercises.map((exer, index) =>
        <Exercise key={ index } data={ exer } />) : undefined;

    return (
        <>
            <h1 className='text-xl font-bold'>
                { topic.topicName }
            </h1>

            <hr />
            <h2 className='font-bold text-lg'>Theory</h2>
            { theories }
            { exercises && 
                <>
                    <hr />
                    <h2 className='font-bold text-lg'>Exercise</h2>
                    { exercises }
                </>
            }
            <Link className='btn btn-blue' to={ `/mod/${mod}` }>
                Back
            </Link>
        </>
   );
}

export default Topic;