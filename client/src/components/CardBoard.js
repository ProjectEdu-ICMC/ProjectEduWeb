import React from 'react';
import Card from './Card';

//import { LanguageContext } from '../contexts/LanguageContext';


function CardBoard({ data, draggable, moveCard, cardSize, cardColor = 'blue', url, update, choose, remove, dir }) {
    //const [ dict, ] = useContext(LanguageContext);

    return (
        <div className='container mx-auto p-3 flex flex-wrap items-stretch'>
            { data && 
                Object.keys(data).map((key, idx) => {
                    return ( 
                    <Card 
                        key={ data[key].id }
                        link={ url && `${ url }/${ data[key].id }` } 
                        size={ cardSize } 
                        data={ data[key] }
                        update={ 
                            () => {
                                update();
                                choose(key);
                            } 
                        }
                        remove={
                            () => {
                                remove(key);
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
