import React, { useContext } from 'react';

import Text from './Text';
import Subtext from './Subtext'
import Image from './Image';
import Video from './Video';
import { MainContext } from '../contexts/MainContext';

function Theory(props) {
    const [ , dispatch ] = useContext(MainContext)

    const { mainTexts, subTexts, images, videos, id, mod, top } = props.data;

    const addMain = (event) => {
        dispatch({
            type: 'ADD_MAIN_TEXT',
            module: mod,
            topic: top,
            theory: id,
            payload: {
                text: "Place holder MainText"
            }
        });
    };

    const addSub = (event) => {
        dispatch({
            type: 'ADD_SUB_TEXT',
            module: mod,
            topic: top,
            theory: id,
            payload: {
                subText: "Place holder SubText"
            }
        });
    };

    const addImage = (event) => {
        dispatch({
            type: 'ADD_IMAGE',
            module: mod,
            topic: top,
            theory: id,
            payload: {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSodFnBBwFrIQ2dL1N4LzjniOYOFbbNk6dS0Q&usqp=CAU"
            }
        });
    };

    const addVideo = (event) => {
        dispatch({
            type: 'ADD_VIDEO',
            module: mod,
            topic: top,
            theory: id,
            payload: {
                src: "https://www.youtube.com/embed/C0DPdy98e4c"
            }
        });
    };
    
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
            <button className='btn btn-blue' onClick={ addMain }>Add Main Text</button>
            { theorySubtexts }
            <button className='btn btn-blue' onClick={ addSub }>Add Sub Text</button>
            { theoryImages }
            <button className='btn btn-blue' onClick={ addImage }>Add Image</button>
            { theoryVideos }
            <button className='btn btn-blue' onClick={ addVideo}>Add Video</button>
            <hr/>
        </>
    )
}

export default Theory;