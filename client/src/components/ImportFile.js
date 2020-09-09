import React, { useContext, useState } from 'react';

import { MainContext } from '../contexts/MainContext'

function ImportFile(props) {
    
    const [ state, dispatch ] = useContext(MainContext);


    const handleSelect = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const data = JSON.parse(reader.result);
                
                dispatch({
                    type: 'SET_DATA',
                    payload: data
                });
            };

            reader.readAsText(event.target.files[0]);
        }
    }

    return ( 
        <form>
            <input type='file' onChange={ handleSelect } />
        </form>
    );
}

export default ImportFile;