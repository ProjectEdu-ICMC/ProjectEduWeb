import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import { useDrag, useDrop } from 'react-dnd';

function Card({ size, draggable, link, data, index, moveCard, update, remove, dir, color, InfoShow }) { 
    const [ noImage, setNoImage ] = useState(false);

    const { name, image } = data;

    const ref = useRef(null);
    
    useEffect(() => {
        setNoImage(false);
    }, [image])

    const invalidSrc = () => {
        setNoImage(true);
    };

    const [ , drop ] = useDrop({
        accept: "Card",
        hover(item) {
            if (!ref.current)
                return;
            const dragId = item.index;
            const hoverId = index;

            if (dragId === hoverId)
                return
            
            moveCard(dragId, hoverId);

            item.index = hoverId;
        }
    });

    const [ { isDragging }, drag ] = useDrag({
        item: {
            type: "Card",
            id: data.id,
            index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    if (draggable && moveCard) 
        drag(drop(ref));

    const display = 
        (noImage || image === undefined) ? 
            <span className='absolute flex h-full w-full items-center justify-center text-3xl font-bold'>{ name ? name[0] : "S" }</span> : 
            <img className='absolute object-cover w-full h-full' src={ image } onError={ invalidSrc } alt={ name } /> ;

    return (
        <div
            ref={ ref } 
            style={{ opacity: isDragging ? 0 : 1 }}
            className='transition-all duration-500 flex bg-transparent flex-col ml-5 mb-5 justify-between'
        >
            <Link className={ `${link ? 'cursor-pointer' : 'cursor-default'} flex flex-grow` } to={ link || '#' }>
                <div className={`${!size ? 'w-64' : `w-${size}`} bg-white flex-grow rounded shadow-lg overflow-hidden relative z-10 break-words`}>
                    { InfoShow === undefined &&
                    <>
                        <div className={ `relative bg-${color}-500 pb-full` }>
                            { display }
                        </div>
                        { 
                            name && 
                            <h2 
                                className='text-lg font-bold text-gray-800 mb-5 px-4 pt-4'
                            >
                                {name}
                            </h2>
                        }
                    </>
                    }
                    { InfoShow !== undefined && <InfoShow color={ color } cardInfo={ data } /> }
                </div>
            </Link>
            <div className={ `flex flex-${dir} rounded-b bg-white p-4 shadow-lg` }>
                { 
                    update && 
                    <button 
                        className='hover:bg-blue-600 py-2 flex-grow bg-blue-500 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none' 
                        onClick={ update }
                    >
                        Atualizar
                    </button> 
                }
                { 
                    remove && 
                    <button 
                        className={ `${dir === 'row' ? 'ml-2' : 'mt-2'} hover:bg-red-600 py-2 flex-grow bg-red-500 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none` }
                        onClick={ remove } 
                    >
                        Remover
                    </button> 
                }
            </div>
        </div> 

    );
}

export default Card;
