import React, { useContext } from 'react';

import { MainContext } from '../contexts/MainContext';
import { LanguageContext } from '../contexts/LanguageContext';

function ImportFile(props) {
    
    const [ , dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);


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
            <div className='mt-2'>
                <label className='btn btn-green' htmlFor='file-input'>{ dict.upload }</label>
                <input className='hidden' id='file-input' type='file' onChange={ handleSelect } />
            </div>
        </form>
    );
}

export default ImportFile;
