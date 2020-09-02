import React from 'react';

function Subtext(props) {
    const { subText } = props.data;
    
    return (
        <p>{ subText }</p>
    )
}

export default Subtext;