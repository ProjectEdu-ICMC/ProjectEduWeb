import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import ModuleForm from '../components/forms/ModuleForm';
//import { LanguageContext } from '../contexts/LanguageContext';

import ModuleModel from '../actions/Module.js';

function Main(props) {
    //const [ dict, ] = useContext(LanguageContext);
    const [ operation, setOperation ] = useState(undefined);
    const [ module, setModule ] = useState(undefined);

    const dispatch = useDispatch();
    const data = useSelector(state => state.module.array);

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

    const deleteModule = async (index) => {
        const { id } = data[index];
        const res = await ModuleModel.remove(id);
        dispatch({
            type: 'DELETE_MODULE',
            payload: res.data.module_id,
            key: Number(index)
        });
    };

    return (
        <>
            <Header />
            <div className='p-10 w-full'></div>
            <div className='mx-auto container'>
                <CardBoard 
                    url='/mod' 
                    cardSize={64} 
                    data={ data } 
                    update={ () => setOperation('update') } 
                    choose={ setModule }
                    remove={ deleteModule } 
                    dir='row' />
                <div className='p-10 w-full'></div>
                <div className='bg-white container p-4 z-20 fixed bottom-0 shadow'>
                    <button 
                        className='hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                        onClick={ () => { 
                            setOperation('add');
                            setModule(undefined);
                        } }
                        > Adicionar Módulo </button>
                </div>
            </div> 

            { operation && 
                <ModuleForm 
                    reset={ () => setOperation(undefined) } 
                    type={ operation } 
                    module={ module } /> 
            }
        </>
   );
}

export default Main;
