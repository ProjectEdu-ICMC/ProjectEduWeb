import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { auth } from '../auth/fire.js';
//import useLocalStorage from '../hooks/localStorageHook';

function Login(props) {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [ error, setError ] = useState(undefined);
    
    //const [ , setToken ] = useLocalStorage('@token');
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { email, password } = data;
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
                result.user.getIdToken()
                    .then((token) => {
                        if (token) {
                            //setToken(token);
                            dispatch({
                                type: 'SIGN_IN',
                                payload: token
                            });
                            history.push('/');
                        }
                    })
                    .catch((error) => {
                        setError(error);
                    });
            }) 
            .catch((error) => {
                setError(error);
            });
    }

    const registerUser = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        setError({ message: 'test' })
    }, []);

    return <div className='bg-gray-100 w-full flex items-center justify-center min-h-screen'>
        <form 
            className='flex flex-col bg-white p-10 rounded shadow-lg' 
            onSubmit={handleSubmit(onSubmit)} 
            noValidate
        >
            { error && <p className='bg-red-500 text-white shadow-inner font-bold p-2 rounded-sm'>{ error.message }</p> }
            <label className='text-sm ml-1 mt-2 text-gray-500' htmlFor='inputEmail'>E-mail</label>
            <input
                type='email' 
                id='inputEmail' 
                name='email'
                ref={register({
                    required: 'Enter your e-mail', 
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                    },
                })}
                className='p-1 text-md outline-none rounded shadow focus:shadow-outline'
            />
            {errors.email && <p className='text-red-700 text-sm px-1'>{errors.email.message}</p>}
            
            <label className='text-sm ml-1 mt-2 text-gray-500' htmlFor='inputPassword'>Password</label>
            <input
                type='password'
                id='inputPassword'
                name='password'
                ref={register({ required: 'Enter your password' })}
                className='p-1 text-md outline-none rounded shadow focus:shadow-outline'
            />
            {errors.password && <p className='text-red-700 text-sm px-1'>{errors.password.message}</p>}
            
            <button className='py-2 bg-blue-500 mt-2 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none' type='submit'>Login</button>
            <button className='py-2 bg-green-500 mt-2 rounded text-white font-bold shadow focus:shadow-outline focus:outline-none' onClick={ registerUser }>Register</button>
        </form>
    </div>;
}




export default Login;
