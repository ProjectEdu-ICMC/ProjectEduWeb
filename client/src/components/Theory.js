import React from 'react';

import Text from './Text';
import Subtext from './Subtext'
import Image from './Image';
import Video from './Video';

function Theory(props) {
    const { mainTexts, subTexts, images, videos } = props.data;

    const theoryTexts = mainTexts ? mainTexts.map((text, index) => 
        <Text key={ index } data={ text } />) : undefined;

    const theorySubtexts = subTexts ? subTexts.map((sub, index) => 
        <Subtext key={ index } data={ sub } />) : undefined;

    const theoryImages = images ? images.map((image, index) => 
        <Image key={ index } data={ image } />) : undefined;

    const theoryVideos = videos ? videos.map((video, index) => 
        <Video key={ index } data={ video } />) : undefined;

    
    return (
        <>
            { theoryTexts }
            { theorySubtexts }
            { theoryImages }
            { theoryVideos }
            <hr/>
        </>
    )
}

export default Theory;