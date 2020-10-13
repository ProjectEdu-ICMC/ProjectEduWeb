import React from 'react';
import Card from './Card';

function CardBoard(props) {
    
    const { data, cardSize, url, update, module } = props;


    // data.push({name: '1test'});
    // data.push({name: '2test'});
    // data.push({name: '3test'});
    // data.push({name: '4test'});
    // data.push({name: '5test'});
    // data.push({name: '6test'});
    // data.push({name: '8test'});
    // data.push({name: '11test'});
    // data.push({name: '2test'});
    // data.push({name: '3test'});


    return (
        <div className='container mx-auto p-3 flex flex-wrap'>
            { data && 
                data.map((mod, ind) => {
                    return ( <div className='flex flex-col ml-5'>
                    <Card link={ url && `${ url }/${ ind }` } 
                        size={ cardSize } 
                        key={ ind } 
                        data={ mod }/> 
                    { update && <button className='btn btn-blue' onClick={ () => {
                        update();
                        module(ind);
                    } }>Update</button> }
                    </div> )
                } ) }
        </div>
    );
}

export default CardBoard;