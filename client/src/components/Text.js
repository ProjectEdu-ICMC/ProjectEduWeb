import React from 'react';

function Text(props) {
    const { text } = props.data;
    
    return (
        <h3 className='font-bold'>{ text }</h3>
    )
}

export default Text;