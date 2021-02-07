import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Card(props) {
    const [ noImage, setNoImage ] = useState(false);

    const { name, image } = props.data;
    const { size, link } = props;
    
    useEffect(() => {
        setNoImage(false);
    }, [image])

    const invalidSrc = () => {
        setNoImage(true);
    };

    const display = 
        (noImage || image === undefined) ? 
            <span className='absolute flex h-full w-full items-center justify-center text-3xl font-bold'>{ name[0] }</span> : 
            <img className='absolute object-cover w-full h-full' src={ image } onError={ invalidSrc } alt={ name } /> ;

    return (
        <Link className={ `${link ? 'cursor-pointer' : 'cursor-default'} flex flex-grow` } to={ link || '#' }>
            <div className={`${!size ? 'w-64' : `w-${size}`} bg-white pb-5 flex-grow rounded shadow-lg overflow-hidden relative z-10 break-words`}>
                <div className='relative bg-blue-500 pb-full'>
                    { display }
                </div>
                <h2 className='text-lg font-bold text-gray-800 px-4 pt-4'>{name}</h2>
            </div>
        </Link>
    );
}

export default Card;
