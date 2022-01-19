import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import SlideModel from '../../actions/Slide';

function SlideForm(props) {
    const { mod, topic } = useParams();

    const { register, handleSubmit, errors } = useForm();
    const { reset, slide } = props;

    const dispatch = useDispatch();

    const initData = useSelector((state) => state.slide.array[slide]);

    const onSubmit = (data) => {
        const { type } = data;

        if (slide === undefined) {
            SlideModel.create({
                type,
                module: mod,
                topic,
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_SLIDE',
                        payload: {
                            type,
                            module: mod,
                            topic,
                            id: result.data.slide_id,
                        },
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            SlideModel.update(initData?.id, {
                type,
                module: mod,
                topic,
            })
                .then((result) =>
                    dispatch({
                        type: 'UPDATE_SLIDE',
                        key: Number(slide),
                        payload: {
                            type,
                            module: mod,
                            topic,
                            id: result.data.slide_id,
                        },
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        }

        reset();
    };

    return (
        <div className="w-full h-screen flex items-start justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0 overflow-auto">
            <form
                className="bg-white p-10 rounded flex flex-col shadow-lg my-20"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="text-lg font-bold ml-1 mb-4 text-gray-800">
                    {slide === undefined
                        ? 'Adicionar Slide'
                        : 'Atualizar Slide'}
                </span>
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="name"
                >
                    Tipo do Slide
                </label>
                <select
                    className="bg-white overflow-hidden shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="text"
                    ref={register({
                        required: 'Selecione um tipo para o Slide',
                    })}
                    defaultValue={initData?.type}
                    name="type"
                >
                    <option value="iinfo">Item de Informação</option>
                    <option value="eexplo">Elemento Exploratório</option>
                    <option value="eexpla">Elemento Explanatório</option>
                    {/*<option value='eaval'>Elemento de Avaliação</option>*/}
                </select>
                {errors.name && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.name.message}
                    </p>
                )}
                <button className="bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                    {slide === undefined ? 'Criar' : 'Atualizar'}
                </button>
                <div
                    className="bg-red-500 hover:bg-red-600 py-2 mt-2 rounded text-center cursor-pointer text-white font-bold shadow focus:outline-none focus:shadow-outline"
                    onClick={() => reset()}
                >
                    Cancelar
                </div>
            </form>
        </div>
    );
}

export default SlideForm;
