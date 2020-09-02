import React from 'react';

function Image(props) {
    const { src } = props.data;
    
    return (
        <img src={ src } />
    )
}

export default Image;