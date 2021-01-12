import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { auth } from '../auth/fire.js';
import useLocalStorage from '../hooks/localStorageHook';

function Login(props) {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [ error, setError ] = useState(undefined);
    
    const [ , setToken ] = useLocalStorage('@token');

    const onSubmit = (data) => {
        const { email, password } = data;
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
                result.user.getIdToken()
                    .then((token) => {
                        if (token) {
                            setToken(token);
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

    return <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            { error && <p className='error'>{ error.message }</p> }
            <label htmlFor='inputEmail'>E-mail</label>
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
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
            
            <label htmlFor='inputPassword'>Password</label>
            <input
                type='password'
                id='inputPassword'
                name='password'
                ref={register({ required: 'Enter your password' })}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
            
            <button type='submit'>Login</button>
        </form>
    </div>;
}

export default Login;
