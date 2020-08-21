import React from 'react';

function Card(props) {
    const { name, image } = props.data

    return (
        <div className='w-1/6 m-'>
            <img src={ image } />
            {name}
        </div>
    );
}

export default Card;