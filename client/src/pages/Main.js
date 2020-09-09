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

    /* https://stackoverflow.com/a/53449590 */
    const handleExport = (data) => {
        const fileData = JSON.stringify(data, null, '    ');
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'filename.json';
        link.href = url;
        link.click();
    }

    const addModule = (event) => {
        dispatch({
            type: 'ADD_MODULE',
            payload: {
                subModuleName: "Place holder Submodule Name",
                subModuleImage: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/information.png"
            }
        })
    }

    const modules = state.data ? state.data.map((subModule) => {
        return {
            name: subModule.subModuleName,
            image: subModule.subModuleImage
        }
    }) : undefined;

    return (
        <>
            { modules ? 
                <>
                    <CardBoard url='/mod' cardSize={64} data={ modules } />
                    <button className='btn btn-blue' onClick={ addModule }>Add Module</button>
                    <button className='btn btn-red' onClick={ handleReset }>Reset</button>
                    <button className='btn btn-green' onClick={ () => handleExport(state.data) }>Export</button>
                </> :
                <ImportFile /> }
        </>
   );
}

export default Main;