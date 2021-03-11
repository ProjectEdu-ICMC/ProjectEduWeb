import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

//import { LanguageContext } from '../../contexts/LanguageContext';

import ModuleModel from '../../actions/Module.js';

function ModuleForm(props) {
    const { reset, module } = props;

    const { register, handleSubmit, errors } = useForm();
    //const [ dict, ] = useContext(LanguageContext);

    const dispatch = useDispatch();
    const initData = useSelector((state) => state.module.array[module]);

    const onSubmit = (data) => {
        const { name, image } = data;

        if (module === undefined) {
            ModuleModel.create({
                name,
                image,
            })
                .then((result) =>
                    dispatch({
                        type: 'ADD_MODULE',
                        payload: {
                            id: result.data.module_id,
                            name,
                            image,
                        },
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            ModuleModel.update(initData?.id, {
                name,
                image,
            })
                .then((result) =>
                    dispatch({
                        type: 'UPDATE_MODULE',
                        key: Number(module),
                        payload: {
                            id: result.data.module_id,
                            name,
                            image,
                        },
                    })
                )
                .catch((error) => console.log(error));
        }

        reset();
    };

    console.log(module);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-opacity-75 bg-black fixed z-20 top-0 left-0">
            <form
                className="bg-white p-10 rounded flex flex-col shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="text-lg font-bold ml-1 mb-4 text-gray-800">
                    {module === undefined
                        ? 'Adicionar Módulo'
                        : 'Atualizar Módulo'}
                </span>
                <label
                    className="text-sm text-gray-500 ml-1 mt-2"
                    htmlFor="name"
                >
                    Nome do Módulo
                </label>
                <input
                    className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="text"
                    ref={register({ required: 'Insira o nome do módulo' })}
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
                    htmlFor="image"
                >
                    Imagem do Módulo
                </label>
                <input
                    className="shadow p-1 rounded text-md outline-none focus:shadow-outline"
                    type="url"
                    ref={register}
                    defaultValue={initData?.image}
                    name="image"
                />
                {errors.image && (
                    <p className="text-red-700 text-sm px-1">
                        {errors.image.message}
                    </p>
                )}
                <button className="bg-green-500 hover:bg-green-600 py-2 mt-8 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline">
                    {module === undefined ? 'Criar' : 'Atualizar'}
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

export default ModuleForm;
