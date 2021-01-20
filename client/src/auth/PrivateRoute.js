import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { config } from '../api.js';
import { auth } from './fire.js';
import { useSelector, useDispatch } from 'react-redux';
//import useLocalStorage from '../hooks/localStorageHook.js';

function PrivateRoute ({ children, ...rest }) {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    //const [ token, setToken] = useLocalStorage('@token');
    const [ loading, setLoading ] = useState(true);

    auth.onAuthStateChanged(async (user) => {
        const token = await user?.getIdToken();
        //setToken(token);
        config(token);
        dispatch({
            type: 'SIGN_IN',
            payload: token
        });
        setLoading(false);
    });

    return (
        <Route {...rest} render={() => {
            // Make loading screen
            return loading ? <p>Loading...</p> :
            token
                ? children
                : <Redirect to='/login' />
        }} />
    );
}

export default PrivateRoute;
