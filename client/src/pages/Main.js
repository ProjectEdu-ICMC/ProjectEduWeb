import React, { useContext, useState } from 'react';

import CardBoard from '../components/CardBoard';
import ModuleForm from '../components/forms/ModuleForm';
import ImportFile from '../components/ImportFile'
import { MainContext } from '../contexts/MainContext';

function Main(props) {
    const [ state, dispatch ] = useContext(MainContext);

    const [ adding, setAdding ] = useState(undefined);
    const [ module, setModule ] = useState(undefined);

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

    const removeModule = (module) => {
        dispatch({
            type: 'REMOVE_MODULE',
            module
        });
    }
    // const addModule = (event) => {
    //     console.log('aaa');
    //     dispatch({
    //         type: 'UPDATE_MODULE',
    //         module: 1,
    //         payload: {
    //             subModuleName: "TEST 1",
    //             subModuleImage: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.howtogeek.com%2Fwp-content%2Fuploads%2F2015%2F02%2Fimg_54e924f260960.jpg&f=1&nofb=1"
    //         }
    //     })
    // }

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
                    <CardBoard url='/mod' cardSize={64} data={ modules } update={ () => setAdding('UPDATE') } module={ setModule } remove={ removeModule } />
                    <button className='btn btn-blue' onClick={ () => { 
                        setAdding('ADD');
                        setModule(undefined);
                        } }>Add Module</button>
                    <button className='btn btn-red' onClick={ handleReset }>Reset</button>
                    <button className='btn btn-green' onClick={ () => handleExport(state.data) }>Export</button>
                    { adding && <ModuleForm reset={ () => setAdding(undefined) } type={ adding } id={ module } /> }
                </> :
                <ImportFile /> }
        </>
   );
}

export default Main;