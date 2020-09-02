import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Module from './pages/Module';
import Topic from './pages/Topic';

import { MainContextProvider } from './contexts/MainContext';

function App() {

    

    return (
        <MainContextProvider>
            <Router>
                <Switch>
                    <Route path='/topic/:mod/:id'>
                        <Topic />
                    </Route>
                    <Route path='/mod/:id'>
                        <Module />
                    </Route>
                    <Route path='/'>
                        <Main /> 
                    </Route>
                </Switch>

            </Router>
        </MainContextProvider>

    );
}

export default App;
