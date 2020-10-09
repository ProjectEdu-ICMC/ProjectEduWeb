import React, { useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContext';

const formReducer = (state, action) => {
    if (action.reset) {
        return {};
    }

    if (action.answer) {
        if (state.answers === undefined)
            state.answers = []

        if (action.answer === 'NEW') 
            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        answerText: ''
                    }
                ]
            };
        return {
            ...state,
            answers: [
                ...state.answers.slice(0, Number(action.answer)),
                {
                    answerText: action.value
                },
                ...state.answers.slice(Number(action.answer) + 1)
            ]
        };
    }

    return {
        ...state,
        [action.name]: action.value
    };
};

function ExerciseForm(props) {
    const { reset } = props;

    const { mod, id } = useParams();

    const [ , dispatch ] = useContext(MainContext);

    const [ formData, setFormData ] = useReducer(formReducer, {});

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.question === undefined || formData.question.length === 0)
            return;

        if (formData.image === undefined || formData.image.length === 0)
            return;

        if (formData.right === undefined || formData.right.length === 0)
            return;
        
        if (formData.answers === undefined || formData.answers.length === 0)
            return;

        dispatch({
            type: 'ADD_EXERCISE',
            module: mod,
            topic: id,
            payload: {
                questionText: formData.question, 
                rightAnswer: formData.right,
                image: formData.image,
                answers: formData.answers
            }
        });
        
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

    const handleAnswer = (event) => {
        const id = event.target.name.split('-')[1];
        
        setFormData({
            answer: id,
            value: event.target.value
        });
    };

    const addAnswer = () => {
        setFormData({
            answer: 'NEW'
        })
       
    };

    const answerList = [...Array(formData.answers ? formData.answers.length : 0)].map((_, i) => {
        return <div key={ i }>
            <input type='radio' name='right' value={ i } onChange={ handleChange } checked={ Number(formData.right) === i } />
            <input type='text' name={ `answer-${ i }` } onChange={ handleAnswer } value={ formData.answers[i].answerText } />
        </div>
    });

    
    console.log(formData);

    return ( 
        <div className='w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed top-0 left-0'>
            <form className='screen-form' onSubmit={ handleSubmit } >
                <span className='text-lg font-bold'>Question</span>
                <input className='placeholder-gray-800' placeholder='Question Text' type='text' onChange={ handleChange } name='question' />
                <input className='placeholder-gray-800' placeholder='Question Image' type='url' onChange={ handleChange } name='image' />
                <span className='text-lg font-bold'>Answers</span>
                { answerList }
                <div className='btn btn-blue' onClick={ addAnswer }>Add Answer</div>
                <button className='btn-green btn'>Create</button>
                <div onClick={ () => reset() } className='btn btn-red'>Cancel</div>
            </form>
        </div>
    );
}

export default ExerciseForm;