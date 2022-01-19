import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import TopicModel from '../../actions/Topic';

function TopicForm(props) {
    const { mod } = useParams();

    const { register, handleSubmit, errors } = useForm();
    const { reset, topic } = props;

    const dispatch = useDispatch();
    const initData = useSelector((state) => state.topic.array[topic]);

    const onSubmit = (data) => {
        const { name, prize } = data;

        if (topic === undefined) {
            TopicModel.create({
                name,
                prize: Number(prize),
                module: mod,
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_TOPIC',
                        payload: {
                            name,
                            prize: Number(prize),
                            module: mod,
                            id: result.data.topic_id,
                        },
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            TopicModel.update(initData.id, {
                name,
                prize: Number(prize),
                module: mod,
            })
                .then((result) =>
                    dispatch({
                        type: 'UPDATE_TOPIC',
                        key: Number(topic),
                        payload: {
                            name,
                            prize: Number(prize),
                            module: mod,
                            id: result.data.topic_id,
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
                    {topic === undefined
                        ? 'Adicionar Tópico'
                        : 'Atualizar Tópico'}
                </span>
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="name"
                >
                    Nome do Tópico
                </label>
                <input
                    className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="text"
                    ref={register({ required: 'Insira o nome do tópico' })}
                    defaultValue={initData?.name}
                    name="name"
                />
                {errors.name && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.name.message}
                    </p>
                )}
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="name"
                >
                    Prêmio em pontos
                </label>
                <input
                    className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="number"
                    ref={register({ 
                        required: 'Insira o prêmio do tópico',
                        min: {
                            value: 1,
                            message: 'O premio precisa ser maior que 0'
                        }
                    })}
                    defaultValue={initData?.prize}
                    name="prize"
                />
                {errors.prize && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.prize.message}
                    </p>
                )}
                <button className="bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                    {topic === undefined ? 'Criar' : 'Atualizar'}
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

export default TopicForm;
