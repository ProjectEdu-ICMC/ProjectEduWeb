import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link } from 'react-router-dom'
//import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import InfoForm from '../components/forms/InfoForm';
//import { LanguageContext } from '../contexts/LanguageContext';

//import update from "immutability-helper";

import InfoModel from '../actions/Info';

function Slide(props) {
    const { mod, topic, slide } = useParams();

    const [ operation, setOperation ] = useState(false);
    //const [ slide, setSlide ] = useState(undefined);

    const dispatch = useDispatch();
    //const data = useSelector(state => state.slide.array);

    useEffect(() => {
        //const fetchSlides = async () => {
        //    const res = await SlideModel.getAllFromTopic(mod, topic);
        //    dispatch({
        //        type: 'SET_SLIDES',
        //        payload: res.data
        //    });
        //};

        //fetchSlides();
    }, [ dispatch, mod, topic, slide ]);
    
    const deleteSlide = async (index) => {
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

    return (
        <>
            <Header />
            <div className='p-10 w-full'></div>
            <div className='mx-auto container'>
                Slide Page
                {/*
                <CardBoard 
                    //url={`/slide/${mod}/${slide}`} 
                    cardSize={32} 
                    data={ data } 
                    update={ () => setOperation(true) } 
                    choose={ setSlide } 
                    remove={ deleteSlide } 
                    dir='col'
                    //draggable={ true }
                    //moveCard={ moveCard }
                    cardColor='purple'
                /> 
                */}
                <div className='p-10 w-full'></div>
                <div className='justify-between flex bg-white container p-4 z-20 fixed bottom-0 shadow'>
                    <div>
                        <button 
                            className='hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                            onClick={ () => { 
                                setOperation(true);
                                //setSlide(undefined);
                            } }
                        >
                            { /*dict.addTopic*/ }
                            Adicionar Slide
                        </button>
                    </div>
                    <Link to={ `/mod/${mod}` }>
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
                    //info={ info }
                /> 
            }
        </>
   );
}

export default Slide;
