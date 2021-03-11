import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link, Redirect } from 'react-router-dom';
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';
import InfoForm from '../components/forms/InfoForm';
import ExplaForm from '../components/forms/ExplaForm';

import IInfo from '../components/cardInfo/IInfo';
import EExpla from '../components/cardInfo/EExpla';

//import { LanguageContext } from '../contexts/LanguageContext';
import { createSelector } from 'reselect';
//import update from "immutability-helper";
import Maintenence from '../components/Maintenence';

import InfoModel from '../actions/Info';
import ExplaModel from '../actions/Expla';

const selectSlideType = createSelector(
    (state) => state.slide?.array,
    (_, id) => id,
    (array, id) => array?.filter((slide) => slide.id === id)[0].type
);

//let renders = 0;
// TODO: fix multiple rerenders
function Slide(props) {
    const { mod, topic, slide } = useParams();

    const [operation, setOperation] = useState(undefined);
    const [selected, setSelected] = useState(undefined);

    const slideType = useSelector((state) => selectSlideType(state, slide));

    console.log(slideType);
    const dispatch = useDispatch();
    const dataInfo = useSelector((state) => state.info.array);
    const dataExpla = useSelector((state) => state.expla.array);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await InfoModel.getAllFromSlide(mod, topic, slide);
            dispatch({
                type: 'SET_INFO',
                payload: res.data,
            });
        };

        const fetchExpla = async () => {
            const res = await ExplaModel.getAllFromSlide(mod, topic, slide);
            dispatch({
                type: 'SET_EXPLA',
                payload: res.data,
            });
        };

        switch (slideType) {
            case 'iinfo':
                fetchInfo();
                break;
            case 'eexpla':
                fetchExpla();
                break;

            default:
                break;
        }
    }, [dispatch, mod, topic, slide, slideType]);

    const deleteInfo = async (index) => {
        const { id } = dataInfo[index];
        const res = await InfoModel.remove(id);
        dispatch({
            type: 'DELETE_INFO',
            payload: res.data.info_id,
            key: Number(index),
        });
    };

    const deleteExpla = async (index) => {
        const { id } = dataExpla[index];
        const res = await ExplaModel.remove(id);
        dispatch({
            type: 'DELETE_EXPLA',
            payload: res.data.expla_id,
            key: Number(index),
        });
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
        return <Redirect to={`/topic/${mod}/${topic}`} />;

    return (
        <>
            <Header />
            <div className="p-10 w-full"></div>
            <div className="mx-auto container">
                {slideType === 'eexplo' && <Maintenence />}
                {/* renders */}
                {slideType === 'iinfo' && (
                    <CardBoard
                        //url={`/slide/${mod}/${slide}`}
                        cardSize={32}
                        data={dataInfo}
                        update={() => setOperation('iinfo')}
                        choose={setSelected}
                        remove={deleteInfo}
                        dir="col"
                        //draggable={ true }
                        //moveCard={ moveCard }
                        cardColor="teal"
                        CardInfo={IInfo}
                    />
                )}
                {slideType === 'eexpla' && (
                    <CardBoard
                        //url={`/slide/${mod}/${slide}`}
                        cardSize={32}
                        data={dataExpla}
                        update={() => setOperation('eexpla')}
                        choose={setSelected}
                        remove={deleteExpla}
                        dir="col"
                        //draggable={ true }
                        //moveCard={ moveCard }
                        cardColor="pink"
                        CardInfo={EExpla}
                    />
                )}
                <div className="p-10 w-full"></div>
                <div className="justify-between flex bg-white container p-4 z-20 fixed bottom-0 shadow">
                    <div>
                        {slideType === 'iinfo' && (
                            <button
                                className="hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline"
                                onClick={() => {
                                    setOperation('iinfo');
                                    setSelected(undefined);
                                }}
                            >
                                {/*dict.addTopic*/}
                                Adicionar Informação
                            </button>
                        )}
                        {slideType === 'eexpla' && (
                            <button
                                className="hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline"
                                onClick={() => {
                                    setOperation('eexpla');
                                    setSelected(undefined);
                                }}
                            >
                                {/*dict.addTopic*/}
                                Adicionar Explicação
                            </button>
                        )}
                    </div>
                    <Link to={`/topic/${mod}/${topic}`}>
                        <button className="hover:bg-red-600 bg-red-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                            {/*dict.back*/}
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>
            {operation === 'iinfo' && (
                <InfoForm
                    reset={() => setOperation(undefined)}
                    info={selected}
                />
            )}
            {operation === 'eexpla' && (
                <ExplaForm
                    reset={() => setOperation(undefined)}
                    expla={selected}
                />
            )}
        </>
    );
}

export default Slide;
