import React, { useContext } from 'react';
import Card from './Card';

import { LanguageContext } from '../contexts/LanguageContext';

function CardBoard(props) {
    
    const { data, cardSize, url, update, choose, remove, dir } = props;
    const [ dict, ] = useContext(LanguageContext);

    return (
        <div className='container mx-auto p-3 flex flex-wrap items-stretch'>
            { data && 
                Object.keys(data).map((id, idx) => {
                    return ( 
                    <div key={ idx } 
                        className='flex flex-col ml-5 justify-between'>
                        <Card link={ url && `${ url }/${ id }` } 
                            size={ cardSize } 
                            data={ data[id] }/> 
                        <div className={ `flex flex-${dir} rounded-b bg-white p-4 shadow-lg` }>
                            { update && 
                            <button 
                                className='hover:bg-blue-600 py-2 flex-grow bg-blue-500 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none' 
                                onClick={ () => {
                                    update();
                                    choose(id);
                                } 
                            }>{ dict.update }</button> }
                            { remove && 
                            <button 
                                className={ `${dir === 'row' ? 'ml-2' : 'mt-2'} hover:bg-red-600 py-2 flex-grow bg-red-500 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none` }
                                onClick={ () => {
                                    remove(id);
                                }
                            } >{ dict.remove }</button> }
                        </div>
                    </div> )
                } ) }
            { Object.keys(data).length === 0 && 
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
