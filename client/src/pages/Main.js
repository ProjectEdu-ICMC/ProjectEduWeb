import React, { useContext } from 'react';

import CardBoard from '../components/CardBoard';
import ImportFile from '../components/ImportFile'
import { MainContext } from '../contexts/MainContext';

function Main(props) {
    const [ state, dispatch ] = useContext(MainContext);

    const handleReset = (event) => {
        dispatch({
            type: 'CLEAR_DATA'
        });
    }

    const subModules = state.data ? state.data.map((subModule) => {
        return {
            name: subModule.subModuleName,
            image: subModule.subModuleImage
        }
    }) : undefined;

    return (
        <>
            { subModules ? 
                <>
                    <CardBoard url='/mod' cardSize={64} data={ subModules } />
                    <button className='btn btn-red' onClick={ handleReset }>Reset</button>
                </> :
                <ImportFile /> }
        </>
   );
}

export default Main;