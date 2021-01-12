import React from 'react';

import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';

import Main from './pages/Main';
import Module from './pages/Module';
import Topic from './pages/Topic';
import Login from './pages/Login';

import { MainContextProvider } from './contexts/MainContext';
import { LanguageContextProvider } from './contexts/LanguageContext';
import PrivateRoute from './auth/PrivateRoute.js';

function App() {
    return (
        <LanguageContextProvider>
            <MainContextProvider>
                <Router>
                    <Switch>
                        <PrivateRoute path='/topic/:mod/:id'>
                            <Topic />
                        </PrivateRoute>
                        <PrivateRoute path='/mod/:id'>
                            <Module />
                        </PrivateRoute>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <PrivateRoute path='/'>
                            <Main /> 
                        </PrivateRoute>
                    </Switch>

                </Router>
            </MainContextProvider>
        </LanguageContextProvider>

    );
}

export default App;
