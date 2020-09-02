import React from 'react';

function Video(props) {
    const { src } = props.data;
    
    return (
        <iframe src={ src }></iframe>
    )
}

export default Video;