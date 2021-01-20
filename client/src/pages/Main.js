import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import ModuleForm from '../components/forms/ModuleForm';
//import ImportFile from '../components/ImportFile'
import { LanguageContext } from '../contexts/LanguageContext';
//import { MainContext } from '../contexts/MainContext';

import ModuleModel from '../actions/Module.js';

function Main(props) {
    //const [ state, dispatch ] = useContext(MainContext);
    const [ dict, ] = useContext(LanguageContext);
    const [ operation, setOperation ] = useState(undefined);
    const [ module, setModule ] = useState(undefined);

    //const handleReset = (event) => {
    //    dispatch({
    //        type: 'CLEAR_DATA'
    //    });
    //}

    ///* https://stackoverflow.com/a/53449590 */
    //const handleExport = (data) => {
    //    const fileData = JSON.stringify(data, null, '    ');
    //    const blob = new Blob([fileData], {type: "text/plain"});
    //    const url = URL.createObjectURL(blob);
    //    const link = document.createElement('a');
    //    link.download = 'filename.json';
    //    link.href = url;
    //    link.click();
    //}

    //const testPost = async (e) => {
    //    //e.preventDefault();
    //    //ModuleModel.create({
    //    //    name: 'Nome teste',
    //    //    image: 'https://www.globalsat.com.tw/comm/upimage/p_170626_02091.jpg'
    //    //});
    //    const data = await ModuleModel.getAll();

    //};
    //    

    //const removeModule = (module) => {
    //    dispatch({
    //        type: 'REMOVE_MODULE',
    //        module
    //    });
    //}

    //const modules = state.data ? state.data.map((subModule) => {
    //    return {
    //        name: subModule.subModuleName,
    //        image: subModule.subModuleImage
    //    }
    //}) : undefined;

    //const [ data, setData ] = useState(undefined);
    const dispatch = useDispatch();
    const data = useSelector(state => state.module);
    console.log('data', data);

    useEffect(() => {
        const fetchModules = async () => {
            const res = await ModuleModel.getAll();
            dispatch({
                type: 'SET_MODULES',
                payload: res.data
            });
        };

        fetchModules();
    }, [dispatch]);

    return (
        <>
            <Header />
            { 
                //data ? 
                <>
            <CardBoard 
                url='/mod' 
                cardSize={64} 
                data={ data } 
                update={ () => setOperation(dict.update) } 
                choose={ setModule }
                // remove={ removeModule } 
                dir='row' />
            <button className='btn btn-blue' 
                onClick={ () => { 
                    setOperation(dict.add);
                    setModule(undefined);
                } }
                >{ dict.addModule }</button>
            <button className='btn btn-red' 
                //onClick={ handleReset }
            >{ dict.reset }</button>
            <button className='btn btn-green' 
                //onClick={ () => handleExport(state.data) } 
            >
                { dict.export }
            </button>
            { operation && 
                <ModuleForm 
                    reset={ () => setOperation(undefined) } 
                    type={ operation } 
                    module={ module } /> 
            }
               </> 
               //:
               //<>
               //    <button className='btn btn-blue' onClick={ testPost }>Test</button>
               //    <ImportFile /> 
               //</> 
            }
        </>
   );
}

export default Main;
