import React from 'react';
import Card from './Card';

//import { LanguageContext } from '../contexts/LanguageContext';


function CardBoard({ data, draggable, moveCard, cardSize, cardColor = 'blue', url, update, choose, remove, dir }) {
    //const [ dict, ] = useContext(LanguageContext);

    return (
        <div className='container mx-auto p-3 flex flex-wrap items-stretch'>
            { data && 
                data.map((cardData, idx) => {
                    return ( 
                    <Card 
                        key={ cardData.id }
                        link={ url && `${ url }/${ cardData.id }` } 
                        size={ cardSize } 
                        data={ cardData }
                        update={ 
                            () => {
                                update();
                                choose(idx);
                            } 
                        }
                        remove={
                            () => {
                                remove(idx);
                            }
                        }
                        dir={ dir }
                        color={ cardColor }
                        draggable={ draggable }
                        moveCard={ moveCard }
                        index={ idx }
                    /> 

                    )
                }) 
            }
            { (!data || Object.keys(data).length === 0) && 
                <span 
                    className='text-lg font-bold text-gray-600'
                >
                    Nada a mostrar.
                </span>
            }
        </div>
    );
}

export default CardBoard;
