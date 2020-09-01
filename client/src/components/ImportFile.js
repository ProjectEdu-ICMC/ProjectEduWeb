import React, { useContext, useState } from 'react';

import { MainContext } from '../contexts/MainContext'

function ImportFile(props) {
    
    const [ state, dispatch ] = useContext(MainContext);
    const [ loading, setLoading] = useState(false);


    const handleSelect = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setLoading(true);

            const reader = new FileReader();
            reader.onload = () => {
                const data = JSON.parse(reader.result);
                
                dispatch({
                    type: 'SET_DATA',
                    payload: data
                });

                setLoading(false);
            };

            reader.readAsText(event.target.files[0]);
        }
    }

    return (
        !loading ? 
            <form>
                <input type='file' onChange={ handleSelect } />
            </form> :
            <div>loading...</div>
    )
}

export default ImportFile;