import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

//import { LanguageContext } from '../../contexts/LanguageContext';

import ExplorationModel from '../../actions/Exploration';

function ExplorationForm(props) {
    const { mod, topic, slide } = useParams();

    const { register, watch, setValue, handleSubmit, errors, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "alternatives"
    })

    const { reset, exploration } = props;

    //const [ dict, ] = useContext(LanguageContext);
    const watchType = watch('type');
    const dispatch = useDispatch();

    const initData = useSelector(
        (state) => state.exploration.array?.[exploration]
    );

    useEffect(() => {
        setValue('type', initData?.type);
        setValue('alternatives', initData?.alternatives);
        console.log(initData?.alternatives)
        setValue('answerNumberAlt', initData?.answerNumber);
    }, [initData, setValue]);
    // TODO: init form data when set to update
    //useEffect(() => {
    //    if (initData?.datatype !== undefined)
    //        setValue('datatype', initData?.datatype);
    //}, [initData, setValue]);

    const onSubmit = (data) => {
        const { type } = data;

        const fields = {
            texto: {
                question: data.questionText,
                answer: data.answerText
            },
            alternativa: {
                question: data.questionAlt,
                answerNumber: data.answerNumberAlt,
                alternatives: data.alternatives
            }
        }[type];

        //const value = {
        //    text: textValue,
        //    image: imageURL,
        //    video: videoURL
        //}[datatype];

        //console.log(value);

        if (exploration === undefined) {
            ExplorationModel.create({
                type,
                ...fields,
                module: mod,
                topic,
                slide
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_EXPLORATION',
                        payload: {
                            type,
                            ...fields,
                            module: mod,
                            topic,
                            slide,
                            id: result.data.exploration_id
                        }
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // TODO: update exercise
            ExplorationModel.update(initData?.id, {
               type,
            //    datatype,
               ...fields,
               module: mod,
               topic,
               slide
            })
               .then((result) =>
                   dispatch({
                       type: 'UPDATE_EXPLORATION',
                       key: Number(exploration),
                       payload: {
                           type,
                        //    datatype,
                           ...fields,
                           module: mod,
                           topic,
                           slide,
                           id: result.data.exploration_id
                       }
                   })
               )
               .catch((error) => {
                   console.log(error);
               });
        }

        reset();
    };

    console.log(errors)

    return (
        <div className="w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0">
            <form
                className="bg-white p-10 rounded flex flex-col shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="text-lg font-bold ml-1 mb-4 text-gray-800">
                    {exploration === undefined
                        ? 'Adicionar Exploração'
                        : 'Atualizar Exploração'}
                </span>
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="type"
                >
                    Tipo de Exercício
                </label>
                <select
                    className="bg-white overflow-hidden shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="text"
                    ref={register({
                        required: 'Selecione um tipo de exercício'
                    })}
                    defaultValue={initData?.type}
                    name="type"
                >
                    <option value="texto">Resposta em Texto</option>
                    <option value="alternativa">Resposta Alternativa</option>
                    {/* <option value="alternativa">Seleção de alternativa</option>*/}
                    {/* TODO: complete a frase e outros modelos de exercícios */}
                </select>

                {errors.type && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.type.message}
                    </p>
                )}

                {watchType === 'texto' && (
                    <>
                        <label
                            className="text-sm text-gray-500 ml-1 mt-2"
                            htmlFor="questionText"
                        >
                            Enunciado
                        </label>
                        <textarea
                            className="resize-none shadow p-1 rounded text-md outline-none focus:shadow-outline"
                            rows="5"
                            id="questionText"
                            name="questionText"
                            ref={register({
                                validate: (value) =>
                                    (watchType === 'texto' &&
                                        value !== undefined &&
                                        value !== '') ||
                                    'Insira um enunciado para o exercício'
                            })}
                            defaultValue={initData?.question}
                        ></textarea>
                        {errors.questionText && (
                            <p className="text-red-700 text-sm px-1">
                                {errors.questionText.message}
                            </p>
                        )}

                        <label
                            className="text-sm text-gray-500 ml-1 mt-2"
                            htmlFor="answerText"
                        >
                            Resposta
                        </label>
                        <input
                            className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                            type="text"
                            ref={register({
                                validate: (value) =>
                                    (watchType === 'texto' &&
                                        value !== undefined &&
                                        value !== '') ||
                                    'Insira uma resposta para o exercício'
                            })}
                            //defaultValue={initData?.value}
                            name="answerText"
                            defaultValue={initData?.answer}
                        />
                        {errors.answerText && (
                            <p className="text-red-700 text-sm px-1">
                                {errors.answerText.message}
                            </p>
                        )}
                    </>
                )}
                {watchType === 'alternativa' && (
                    <>
                        <label
                            className="text-sm text-gray-500 ml-1 mt-2"
                            htmlFor="questionText"
                        >
                            Enunciado
                        </label>
                        <textarea
                            className="resize-none shadow p-1 rounded text-md outline-none focus:shadow-outline"
                            rows="5"
                            id="questionAlt"
                            name="questionAlt"
                            ref={register({
                                validate: (value) =>
                                    (watchType === 'alternativa' &&
                                        value !== undefined &&
                                        value !== '') ||
                                    'Insira um enunciado para o exercício'
                            })}
                            defaultValue={initData?.question}
                        ></textarea>
                        {errors.questionAlt && (
                            <p className="text-red-700 text-sm px-1">
                                {errors.questionAlt.message}
                            </p>
                        )}

                        {/* <label
                            className="text-sm text-gray-500 ml-1 mt-2"
                            htmlFor="answerText"
                        >
                            Alternativas
                        </label> */}
                            {fields.map((alternative, alternativeIndex) => (
                                <div key={alternative.id} className="mt-2">
                                    <label
                                        className="text-sm text-gray-500 ml-1 mt-2"
                                        htmlFor="questionText"
                                    >
                                        Alternativa {alternativeIndex + 1}:
                                    </label>
                                    <br/>
                                    <input
                                        ref={register({
                                            required: 'A alternativa deve ser preenchida'
                                        })}
                                        name={`alternatives[${alternativeIndex}].text`}
                                        control={control}
                                        defaultValue={initData?.alternatives[alternativeIndex]?.text}
                                        className="resize-none shadow p-1 rounded text-md outline-none focus:shadow-outline"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => remove(alternativeIndex)}
                                        className="bg-red-500 hover:bg-red-600 py-1 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline px-3 ml-2"
                                    >
                                        X
                                    </button>
                                    {(errors.alternatives && errors.alternatives[alternativeIndex]) && errors.alternatives[alternativeIndex].text && (
                                        <p className="text-red-700 text-sm px-1">
                                            {errors.alternatives[alternativeIndex].text.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                className="bg-blue-500 hover:bg-blue-600 py-2 mt-2 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => append({ text: "" })}
                            >
                                Adicionar Alternativa
                            </button>
                        {// erro de não ter alternativa
                        errors.answerText && (
                            <p className="text-red-700 text-sm px-1">
                                {errors.answerText.message}
                            </p>
                        )}

                        <label
                            className="text-sm text-gray-500 ml-1 mt-2"
                            htmlFor="questionText"
                        >
                            Resposta correta
                        </label>
                        <select
                            className="bg-white overflow-hidden shadow p-1 mt-2 rounded text-md outline-none focus:shadow-outline"
                            type="text"
                            ref={register({
                                required: 'Selecione uma alternativa como correta'
                            })}
                            defaultValue={initData?.answerNumber}
                            name="answerNumberAlt"
                        >
                            {
                                fields.map((alternative, index) => <option value={index}>{index + 1}</option>)
                            }
                        </select>

                        {errors.answerNumberAlt && (
                            <p className="text-red-700 text-sm px-1">
                                {errors.answerNumberAlt.message}
                            </p>
                        )}
                    </>
                )}
                {/*
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="datatype"
                >
                    Tipo do dado
                </label>
                <div className="flex flex-wrap">
                    <input
                        ref={register({
                            required:
                                'Selecione um tipo de dados para a Exploração'
                        })}
                        className="mr-1"
                        type="radio"
                        name="datatype"
                        value="text"
                        id="text"
                    />
                    <label className="text-gray-800" htmlFor="text">
                        Texto
                    </label>
                    <input
                        ref={register({
                            required:
                                'Selecione um tipo de dados para a Exploração'
                        })}
                        className="ml-2 mr-1"
                        type="radio"
                        name="datatype"
                        value="image"
                        id="image"
                    />
                    <label className="text-gray-800" htmlFor="image">
                        Imagem
                    </label>
                    <input
                        ref={register({
                            required:
                                'Selecione um tipo de dados para a Exploração'
                        })}
                        className="ml-2 mr-1"
                        type="radio"
                        name="datatype"
                        value="video"
                        id="video"
                    />
                    <label className="text-gray-800" htmlFor="video">
                        Vídeo
                    </label>
                </div>
                {errors.datatype && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.datatype.message}
                    </p>
                )}
                {watchDataType && (
                    <label
                        className="text-sm text-gray-500 ml-1 mt-2"
                        htmlFor="datatype"
                    >
                        Valor da Exploração
                    </label>
                )}
                {watchDataType === 'text' && (
                    <textarea
                        className="resize-none shadow p-1 rounded text-md outline-none focus:shadow-outline"
                        type="text"
                        rows="5"
                        ref={register({
                            validate: (value) =>
                                (watchDataType === 'text' &&
                                    value !== undefined &&
                                    value !== '') ||
                                'Insira o texto da exploração'
                        })}
                        defaultValue={initData?.value}
                        name="textValue"
                    ></textarea>
                )}
                {errors.textValue && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.textValue.message}
                    </p>
                )}
                {watchDataType === 'image' && (
                    <input
                        className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                        type="url"
                        ref={register({
                            validate: (value) =>
                                (watchDataType === 'image' &&
                                    value !== undefined &&
                                    value !== '') ||
                                'Insira a URL da imagem da exploração'
                        })}
                        defaultValue={initData?.value}
                        name="imageURL"
                    />
                )}
                {errors.imageValue && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.imageValue.message}
                    </p>
                )}
                {watchDataType === 'video' && (
                    <input
                        className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                        type="url"
                        ref={register({
                            validate: (value) =>
                                (watchDataType === 'video' &&
                                    value !== undefined &&
                                    value !== '') ||
                                'Insira a URL do vídeo da exploração'
                        })}
                        defaultValue={initData?.value}
                        name="videoURL"
                    />
                )}
                {errors.videoValue && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.videoValue.message}
                    </p>
                )}

                */}
                <button className="bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                    {exploration === undefined ? 'Criar' : 'Atualizar'}
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

export default ExplorationForm;
