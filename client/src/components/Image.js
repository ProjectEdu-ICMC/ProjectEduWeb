import React from 'react';

function Image(props) {
    const { id, src } = props.data;
    
    return (
        <img alt={ id } src={ src } />
    )
}

export default Image;