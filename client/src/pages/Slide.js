import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link, Redirect } from 'react-router-dom';
import CardBoard from '../components/CardBoard';
import Header from '../components/default/Header';

import InfoForm from '../components/forms/InfoForm';
import ExplanationForm from '../components/forms/ExplanationForm';
import ExplorationForm from '../components/forms/ExplorationForm';

import IInfo from '../components/cardInfo/IInfo';
import EExpla from '../components/cardInfo/EExpla';
import EExplo from '../components/cardInfo/EExplo';

//import { LanguageContext } from '../contexts/LanguageContext';
import { createSelector } from 'reselect';
//import update from "immutability-helper";
import Maintenence from '../components/Maintenence';

import InfoModel from '../actions/Info';
import ExplanationModel from '../actions/Explanation';
import ExplorationModel from '../actions/Exploration';

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

    const dispatch = useDispatch();

    const dataInfo = useSelector((state) => state.info.array);
    const dataExplanation = useSelector((state) => state.explanation.array);
    const dataExploration = useSelector((state) => state.exploration.array);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await InfoModel.getAllFromSlide(mod, topic, slide);
            dispatch({
                type: 'SET_INFO',
                payload: res.data
            });
        };

        const fetchExplanation = async () => {
            const res = await ExplanationModel.getAllFromSlide(
                mod,
                topic,
                slide
            );
            dispatch({
                type: 'SET_EXPLANATION',
                payload: res.data
            });
        };

        const fetchExploration = async () => {
            const res = await ExplorationModel.getAllFromSlide(
                mod,
                topic,
                slide
            );
            dispatch({
                type: 'SET_EXPLORATION',
                payload: res.data
            });
        };

        switch (slideType) {
            case 'iinfo':
                fetchInfo();
                break;
            case 'eexpla':
                fetchExplanation();
                break;
            case 'eexplo':
                fetchExploration();
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
            key: Number(index)
        });
    };

    const deleteExplanation = async (index) => {
        const { id } = dataExplanation[index];
        const res = await ExplanationModel.remove(id);
        dispatch({
            type: 'DELETE_EXPLANATION',
            payload: res.data.explanation_id,
            key: Number(index)
        });
    };

    const deleteExploration = async (index) => {
        const { id } = dataExploration[index];
        const res = await ExplorationModel.remove(id);
        dispatch({
            type: 'DELETE_EXPLORATION',
            payload: res.data.exploration_id,
            key: Number(index)
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

    console.log(dataExploration);
    return (
        <>
            <Header />
            <div className="p-10 w-full"></div>
            <div className="mx-auto container">
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
                        data={dataExplanation}
                        update={() => setOperation('eexpla')}
                        choose={setSelected}
                        remove={deleteExplanation}
                        dir="col"
                        //draggable={ true }
                        //moveCard={ moveCard }
                        cardColor="pink"
                        CardInfo={EExpla}
                    />
                )}
                {slideType === 'eexplo' && (
                    <CardBoard
                        //url={`/slide/${mod}/${slide}`}
                        cardSize={32}
                        data={dataExploration}
                        update={() => setOperation('eexplo')}
                        choose={setSelected}
                        remove={deleteExploration}
                        dir="col"
                        //draggable={ true }
                        //moveCard={ moveCard }
                        cardColor="yellow"
                        CardInfo={EExplo}
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
                        {slideType === 'eexplo' && (
                            <button
                                className="hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline"
                                onClick={() => {
                                    setOperation('eexplo');
                                    setSelected(undefined);
                                }}
                            >
                                {/*dict.addTopic*/}
                                Adicionar Exploração
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
                <ExplanationForm
                    reset={() => setOperation(undefined)}
                    explanation={selected}
                />
            )}
            {operation === 'eexplo' && (
                <ExplorationForm
                    reset={() => setOperation(undefined)}
                    exploration={selected}
                />
            )}
        </>
    );
}

export default Slide;
