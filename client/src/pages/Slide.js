import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link, Redirect } from 'react-router-dom'
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import InfoForm from '../components/forms/InfoForm';

import IInfo from '../components/cardInfo/IInfo';
//import { LanguageContext } from '../contexts/LanguageContext';
import { createSelector } from 'reselect';
//import update from "immutability-helper";
import Maintenence from '../components/Maintenence';

import InfoModel from '../actions/Info';

const selectSlideType = createSelector(
    state => state.slide?.array,
    (_, id) => id,
    (array, id) => array?.filter(slide => slide.id === id)[0].type
);

//let renders = 0;
// TODO: fix multiple rerenders
function Slide(props) {
    const { mod, topic, slide } = useParams();

    const [ operation, setOperation ] = useState(false);
    const [ info, setInfo ] = useState(undefined);
    

    const slideType = useSelector(state => selectSlideType(state, slide));


    console.log(slideType);
    const dispatch = useDispatch();
    const data = useSelector(state => state.info.array);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await InfoModel.getAllFromSlide(mod, topic, slide);
            dispatch({
                type: 'SET_INFO',
                payload: res.data
            });
        };

        fetchInfo();
    }, [ dispatch, mod, topic, slide ]);
    
    const deleteInfo = async (index) => {
        //const { id } = data[index];
        //const res = await SlideModel.remove(id);
        //dispatch({
        //    type: 'DELETE_SLIDE',
        //    payload: res.data.topic_id,
        //    key: Number(index)
        //});
    };

    //const moveCard = (dragIndex, hoverIndex) => {
    //    const draggedCard = data[dragIndex];
    //    dispatch({
    //        type: 'SET_SLIDES',
    //        payload: update(data, {
    //            $splice: [[dragIndex, 1], [hoverIndex, 0, draggedCard]]
    //        })
    //    });
    //};
    
    //renders++;
    if (slideType === undefined)
        return <Redirect to={ `/topic/${mod}/${topic}` } />;

    return (
        <>
            <Header />
            <div className='p-10 w-full'></div>
            <div className='mx-auto container'>
                { slideType !== 'iinfo' && <Maintenence /> }
                { /* renders */ }
                { slideType === 'iinfo' &&
                <CardBoard 
                    //url={`/slide/${mod}/${slide}`} 
                    cardSize={ 32 } 
                    data={ data } 
                    update={ () => setOperation(true) } 
                    choose={ setInfo } 
                    remove={ deleteInfo } 
                    dir='col'
                    //draggable={ true }
                    //moveCard={ moveCard }
                    cardColor='teal'
                    CardInfo={ IInfo }
                /> 
                }
                <div className='p-10 w-full'></div>
                <div className='justify-between flex bg-white container p-4 z-20 fixed bottom-0 shadow'>
                    <div>
                        { slideType === 'iinfo' &&
                        <button 
                            className='hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                            onClick={ () => { 
                                setOperation(true);
                                setInfo(undefined);
                            } }
                        >
                            { /*dict.addTopic*/ }
                            Adicionar Informação 
                        </button>
                        }
                    </div>
                    <Link to={ `/topic/${mod}/${topic}` }>
                        <button 
                            className='hover:bg-red-600 bg-red-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'>
                            { /*dict.back*/ }
                            Voltar
                        </button> 
                    </Link>
                </div>
            </div> 
            { operation && 
                <InfoForm 
                    reset={ () => setOperation(false) } 
                    info={ info }
                /> 
            }
        </>
   );
}

export default Slide;
