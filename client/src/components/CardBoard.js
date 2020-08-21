import React from 'react';
import Card from './Card';

function CardBoard(props) {
    
    const { data } = props;
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})
    data.push({image: '', name: 'test'})

    return (
        <div className='flex flex-wrap container mx-auto p-3'>
            { data && data.map((mod, ind) => <Card key={ ind } data={ mod }/>) }
        </div>
    );
}

export default CardBoard;