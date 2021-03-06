import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

//import { LanguageContext } from '../../contexts/LanguageContext';

import TopicModel from '../../actions/Topic';

function TopicForm(props) {
    const { mod } = useParams();

    const { register, handleSubmit, errors } = useForm();
    const { reset, topic } = props;

    //const [ dict, ] = useContext(LanguageContext);

    const dispatch = useDispatch();
    const initData = useSelector((state) => state.topic.array[topic]);

    const onSubmit = (data) => {
        const { name } = data;

        if (topic === undefined) {
            TopicModel.create({
                name,
                module: mod,
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_TOPIC',
                        payload: {
                            name,
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
                module: mod,
            })
                .then((result) =>
                    dispatch({
                        type: 'UPDATE_TOPIC',
                        key: Number(topic),
                        payload: {
                            name,
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
        <div className="w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0">
            <form
                className="bg-white p-10 rounded flex flex-col shadow-lg"
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
