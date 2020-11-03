import React, { useContext, useState } from 'react';

import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import ModuleForm from '../components/forms/ModuleForm';
import ImportFile from '../components/ImportFile'
import { LanguageContext } from '../contexts/LanguageContext';
import { MainContext } from '../contexts/MainContext';

function Main(props) {
    const [ state, dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);
    const [ operation, setOperation ] = useState(undefined);
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

    const modules = state.data ? state.data.map((subModule) => {
        return {
            name: subModule.subModuleName,
            image: subModule.subModuleImage
        }
    }) : undefined;

    return (
        <>
            <Header />
            { modules ? 
                <>
                    <CardBoard url='/mod' cardSize={64} data={ modules } update={ () => setOperation(dict.update) } choose={ setModule } remove={ removeModule } dir='row' />
                    <button className='btn btn-blue' onClick={ () => { 
                        setOperation(dict.add);
                        setModule(undefined);
                        } }>{ dict.addModule }</button>
                    <button className='btn btn-red' onClick={ handleReset }>{ dict.reset }</button>
                    <button className='btn btn-green' onClick={ () => handleExport(state.data) }>{ dict.export }</button>
                    { operation && <ModuleForm reset={ () => setOperation(undefined) } type={ operation } module={ module } /> }
                </> :
                <ImportFile /> }
        </>
   );
}

export default Main;