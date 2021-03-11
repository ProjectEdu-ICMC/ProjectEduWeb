import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

//import { LanguageContext } from '../../contexts/LanguageContext';

import InfoModel from '../../actions/Info';

function InfoForm(props) {
    const { mod, topic, slide } = useParams();

    const { register, watch, setValue, handleSubmit, errors } = useForm();
    const { reset, info } = props;

    //const [ dict, ] = useContext(LanguageContext);
    const watchDataType = watch('datatype');
    const dispatch = useDispatch();

    const initData = useSelector((state) => state.info.array?.[info]);

    useEffect(() => {
        if (initData?.datatype !== undefined)
            setValue('datatype', initData?.datatype);
    }, [initData, setValue]);

    const onSubmit = (data) => {
        const { type, datatype, textValue, imageURL, videoURL } = data;

        const value = {
            text: textValue,
            image: imageURL,
            video: videoURL,
        }[datatype];

        console.log(value);

        if (info === undefined) {
            InfoModel.create({
                type,
                datatype,
                value,
                module: mod,
                topic,
                slide,
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_INFO',
                        payload: {
                            type,
                            datatype,
                            value,
                            module: mod,
                            topic,
                            slide,
                            id: result.data.info_id,
                        },
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            InfoModel.update(initData?.id, {
                type,
                datatype,
                value,
                module: mod,
                topic,
                slide,
            })
                .then((result) =>
                    dispatch({
                        type: 'UPDATE_INFO',
                        key: Number(info),
                        payload: {
                            type,
                            datatype,
                            value,
                            module: mod,
                            topic,
                            slide,
                            id: result.data.info_id,
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
                    {info === undefined
                        ? 'Adicionar Informação'
                        : 'Atualizar Informação'}
                </span>
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="type"
                >
                    Tipo da Informação
                </label>
                <select
                    className="bg-white overflow-hidden shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="text"
                    ref={register({
                        required: 'Selecione um tipo para a Informação',
                    })}
                    defaultValue={initData?.type}
                    name="type"
                >
                    <option value="fato">Fato</option>
                    <option value="conceito">Conceito</option>
                    <option value="princípio">Princípio</option>
                    <option value="procedimento">Procedimento</option>
                </select>

                {errors.type && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.type.message}
                    </p>
                )}

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
                                'Selecione um tipo de dados  para a Informação',
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
                                'Selecione um tipo de dados  para a Informação',
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
                                'Selecione um tipo de dados  para a Informação',
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
                        Valor da Informação
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
                                'Insira o texto da informação',
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
                                'Insira a URL da imagem da informação',
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
                                'Insira a URL do vídeo da informação',
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
                {/* TODO: finalize form data for all types of slides */}
                <button className="bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                    {info === undefined ? 'Criar' : 'Atualizar'}
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

export default InfoForm;
