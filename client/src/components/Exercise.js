import React from 'react';

function Exercise(props) {

    const { questionText, rightAnswer, image, answers } = props.data;

    const options = answers.map((opt, index) => index === Number(rightAnswer) ? 
        <li key={ index } className='text-green-700'> { opt.answerText } </li> :
        <li key={ index } > { opt.answerText } </li>);

    return (
        <>
            { image && <img src={ image } alt={ questionText } /> }
            <h2>{ questionText }</h2>
            <ul>
                { options }
            </ul>
            <hr />
        </>
    )
}

export default Exercise;