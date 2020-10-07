import React, { useContext } from 'react';

import { useParams, Link, Redirect } from 'react-router-dom';
import { MainContext } from '../contexts/MainContext';
import Exercise from '../components/Exercise';
import Theory from '../components/Theory';

function Topic(props) {
    const { mod, id } = useParams();
    const [ state, dispatch ] = useContext(MainContext);

    if (!state.data) 
        return ( <Redirect to='/' /> );

    const addTheory = (event) => {
        dispatch({
            type: 'ADD_THEORY',
            module: mod,
            topic: id,
            payload: {
                mainTexts: [],
                subTexts: [],
                images: [],
                videos: []
            }
        });
    }

    const addExercise = (event) => {
        dispatch({
            type: 'ADD_EXERCISE',
            module: mod,
            topic: id,
            payload: {
                questionText: "Place holder Question Text",
                rightAnswer: 0,
                image: "",
                answers: [
                    {
                        answerText: "Place holder answerText 1"
                    },
                    {
                        answerText: "Place holder answerText 2"
                    }
                ]
            }
        });
    }

    const topic = state.data[mod].subModuleTopics[id];

    const theories = topic.topicTheory ? topic.topicTheory.map((theory, index) => 
        <Theory key={ index } data={ { 
            ...theory,
            id: index,
            mod: mod,
            top: id
        } } />) : undefined;

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
            <button className='btn btn-blue' onClick={ addTheory }>Add Theory</button>
            { exercises && 
                <>
                    <hr />
                    <h2 className='font-bold text-lg'>Exercise</h2>
                    { exercises }
                </>
            }
            <button className='btn btn-blue' onClick={ addExercise }>Add Exercise</button>
            <Link className='btn btn-blue' to={ `/mod/${mod}` }>
                Back
            </Link>
        </>
   );
}

export default Topic;