import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { config } from '../../api.js';
import { auth } from '../../auth/fire.js';
import { useSelector, useDispatch } from 'react-redux';

function PrivateRoute ({ children, ...rest }) {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);

    auth.onAuthStateChanged(async (user) => {
        const token = await user?.getIdToken();
        config(token);
        dispatch({
            type: 'SIGN_IN',
            payload: token
        });
        setLoading(false);
    });

    return (
        <Route {...rest} render={() => {
            return loading ? <p>Loading...</p> :
            token
                ? children
                : <Redirect to='/login' />
        }} />
    );
}

export default PrivateRoute;
