import React from 'react';
import Card from './Card';

function CardBoard(props) {
    
    const { data, cardSize, url, update, choose, remove, dir } = props;


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
                    return ( <div key={ ind } className='flex flex-col ml-5'>
                    <Card link={ url && `${ url }/${ ind }` } 
                        size={ cardSize } 
                        data={ mod }/> 
                    <div className={ `flex flex-${dir}` }>
                    { update && <button className='btn btn-blue flex-grow' onClick={ () => {
                        update();
                        choose(ind);
                    } }>Update</button> }
                    { remove && <button className='btn btn-red flex-grow' onClick={ () => {
                        remove(ind);
                    }} >Remove</button> }
                    </div>
                    </div> )
                } ) }
        </div>
    );
}

export default CardBoard;