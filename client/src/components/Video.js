import React from 'react';

function Video(props) {
    const { id, src } = props.data;
    
    return (
        <iframe title={ id } src={ src }></iframe>
    )
}

export default Video;