//import React, { useContext, useState } from 'react';
//
//import { useParams, Link, Redirect } from 'react-router-dom';
//import { MainContext } from '../contexts/MainContext';
//import Exercise from '../components/Exercise';
//import Theory from '../components/Theory';
//import ExerciseForm from '../components/forms/ExerciseForm';
//
//function Topic(props) {
//    const { mod, id } = useParams();
//    const [ state, dispatch ] = useContext(MainContext);
//    const [ adding, setAdding ] = useState(false);
//
//    if (!state.data) 
//        return ( <Redirect to='/' /> );
//
//    const addTheory = (event) => {
//        dispatch({
//            type: 'ADD_THEORY',
//            module: mod,
//            topic: id,
//            payload: {
//                mainTexts: [],
//                subTexts: [],
//                images: [],
//                videos: []
//            }
//        });
//    }
//
//    // const addExercise = (event) => {
//    //     dispatch({
//    //         type: 'ADD_EXERCISE',
//    //         module: mod,
//    //         topic: id,
//    //         payload: {
//    //             questionText: "Place holder Question Text",
//    //             rightAnswer: 0,
//    //             image: "",
//    //             answers: [
//    //                 {
//    //                     answerText: "Place holder answerText 1"
//    //                 },
//    //                 {
//    //                     answerText: "Place holder answerText 2"
//    //                 }
//    //             ]
//    //         }
//    //     });
//    // }
//
//    const topic = state.data[mod].subModuleTopics[id];
//
//    const theories = topic.topicTheory ? topic.topicTheory.map((theory, index) => 
//        <Theory key={ index } data={ { 
//            ...theory,
//            id: index,
//            mod: mod,
//            top: id
//        } } />) : undefined;
//
//    const exercises = topic.topicExercises ? topic.topicExercises.map((exer, index) =>
//        <Exercise key={ index } data={ exer } />) : undefined;
//
//    return (
//        <>
//            <h1 className='text-xl font-bold'>
//                { topic.topicName }
//            </h1>
//
//            <hr />
//            <h2 className='font-bold text-lg'>Theory</h2>
//            { theories }
//            <button className='btn btn-blue' onClick={ addTheory }>Add Theory</button>
//            { exercises && 
//                <>
//                    <hr />
//                    <h2 className='font-bold text-lg'>Exercise</h2>
//                    { exercises }
//                </>
//            }
//            <button className='btn btn-blue' onClick={ () => setAdding(true) }>Add Exercise</button>
//            { adding && <ExerciseForm reset={ () => setAdding(false) } /> }
//            <Link className='btn btn-blue' to={ `/mod/${mod}` }>
//                Back
//            </Link>
//        </>
//   );
//}
//
//export default Topic;
import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import SlideForm from '../components/forms/SlideForm';
import { LanguageContext } from '../contexts/LanguageContext';
//import SlideModel from '../actions/Topic.js';

function Topic(props) {
    const { mod, topic } = useParams();

    const [ dict, ] = useContext(LanguageContext);

    const [ operation, setOperation ] = useState(undefined);
    const [ slide, setSlide ] = useState(undefined);

    const dispatch = useDispatch();
    const data = useSelector(state => state.slide);

    useEffect(() => {
        const fetchTopics = async () => {
            //const res = await TopicModel.getAllFromModule(mod);
            //dispatch({
            //    type: 'SET_TOPICS',
            //    payload: res.data
            //});
        };

        fetchTopics();
    }, [ dispatch, mod ]);
    
    const deleteSlide = async (id) => {
        //const res = await TopicModel.remove(id);
        //dispatch({
        //    type: 'DELETE_TOPIC',
        //    payload: res.data.topic_id 
        //});
    };

    return (
        <>
            <Header />
            <div className='p-10 w-full'></div>
            <p>{ mod }</p>
            <p>{ topic }</p>
            <div className='mx-auto container'>
                <CardBoard 
                    url={`/slide/${mod}/${slide}`} 
                    cardSize={32} 
                    data={ data } 
                    update={ () => setOperation(dict.update) } 
                    choose={ setSlide } 
                    remove={ deleteSlide } 
                    dir='col'
                    draggable={ true }
                /> 
                <div className='p-10 w-full'></div>
                <div className='justify-between flex bg-white container p-4 z-20 fixed bottom-0 shadow'>
                    <div>
                        <button 
                            className='hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                            onClick={ () => { 
                                setOperation(dict.add);
                                setSlide(undefined);
                            } }
                        >
                            { /*dict.addTopic*/ }
                            Adicionar Slide
                        </button>
                    </div>
                    <Link to={ `/mod/${mod}` }>
                        <button 
                            className='hover:bg-red-600 bg-red-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'>
                            { /*dict.back*/ }
                            Voltar
                        </button> 
                    </Link>
                </div>
            </div> 
            { operation && 
                <SlideForm 
                    reset={ () => setOperation(undefined) } 
                    type={ operation } 
                    slide={ slide }
                /> 
            }
        </>
   );
}

export default Topic;
